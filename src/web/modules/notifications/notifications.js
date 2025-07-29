// ======================== notifications ========================
// version 0.1

function Notifications() {
    this.notificationsList = {};
    this.contentTemplates = {
        default: `<h1>%%title%%</h1>
            <div data-process="body">
                <span>%%content%%</span>
                <a href="%%src%%" data-type="link">%%content%%</a>
            </div>`,
        warning: `<h1>Warning: %%message%%</h1>`
    };
    this.setup = {
        units: 'px',
        topOffset: 30,
        areaWidth: 300,
        displayDuration: 2000,
        autoHide: false
    }

    // emit new notification
    this.emit = (msg,type) => {
        const nid = crypto.randomUUID();
        this.notificationsList[nid] = {block: this.createNotifier(nid)};
        this.showMessage(nid,msg,type);
    }

    // show notification message
    this.showMessage =(id,msg,type) => {
        let block = this.notificationsList[id].block;
        this.addContent(block,msg,type)
        block.style.marginTop = (window.pageYOffset + this.setup.topOffset) + this.setup.units;
        block.style.display = 'block';
        const callback = this.setup.autoHide ? () => {setTimeout(this.hideMessage,this.setup.displayDuration,id)} : null;
        this.slideIt(block,'right',(-1 * this.setup.areaWidth - 20),0,3,callback);
    }

     // hide notification message
    this.hideMessage = (id) => {
        const callback = () => {this.removeNotifier(id)};
        this.slideIt(this.notificationsList[id].block,'right',0,(-1 * this.setup.areaWidth - 120),-3,callback);
    }

    // create notification element
    this.createNotifier = (id) => {
        // read position of the last notification and place new one below it
        const lastArea = [...document.querySelectorAll('.notificationArea')].pop();
        // !!!!!!!!!
        const newPos = lastArea ? (Number(lastArea.style.top.replace(this.setup.units,'')) + 100) : 0;
        const notificationBlock = document.createElement('div');
        notificationBlock.setAttribute('class',`notificationArea`);
        notificationBlock.style.top = `${newPos}${this.setup.units}`;
        notificationBlock.style.width = `${this.setup.areaWidth}${this.setup.units}`;
        if (!this.setup.autoHide) {
            notificationBlock.addEventListener('click',() => {this.hideMessage(id)});
            notificationBlock.style.cursor = 'pointer';
        }
        document.getElementsByTagName('body')[0].appendChild(notificationBlock);
        return notificationBlock;
    }

    // add content to notification element
    this.addContent = (block,msg,type) => {
        if (typeof msg == 'string') { // content is a string, add it as is
            block.innerHTML = msg;
        } else if ((msg instanceof Array) || (msg instanceof Object)) {  // content is structured, use template to display it
            let factory = new TemplatingFactory();
            block.innerHTML = (type && this.contentTemplates[type]) ? this.contentTemplates[type] : this.contentTemplates.default;
            factory.renderRoot(block,msg);
        }
    }

    // remove notification element
    this.removeNotifier = (id) => {
        this.notificationsList[id].block.remove();
        delete this.notificationsList[id];
    }

    // slide element
    this.slideIt = (slider,position,progress,end,step,callback) => {
        slider.style[position] = `${progress}${this.setup.units}`;
        if (Math.abs(end - progress) >= Math.abs(step)) {
            progress += step;
            setTimeout(() => {
                this.slideIt(slider,position,progress,end,step,callback);
            },4);
        } else {
            if (callback) callback();
        }
    }
}