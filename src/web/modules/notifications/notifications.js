// ======================== notifications ========================
// version 0.1

function Notifications(setup,templates) {
    this.notificationsList = {};
    //predefined processing templates
    this.predefined = {
        default: `<h1>%%title%%</h1>
            <div data-process="body">
                <span>%%content%%</span>
                <a href="%%src%%" data-type="link">%%content%%</a>
            </div>`,
        warning: `<h1>Warning: %%title%%</h1>
            <div data-process="body">
                <span>%%content%%</span>
                <a href="%%src%%" data-type="link">%%content%%</a>
            </div>`,
        error: `<h1>Error: %%title%%</h1>
            <div data-process="body">
                <span>%%content%%</span>
                <a href="%%src%%" data-type="link">%%content%%</a>
            </div>`,
        hint: `<h1>Hint: %%title%%</h1>
            <div data-process="body">
                <span>%%content%%</span>
                <a href="%%src%%" data-type="link">%%content%%</a>
            </div>`
    };
    // default notifications setup
    this.default = {
        units: 'px',
        topOffset: 20,
        areaSpacing: 8,
        areaWidth: 300,
        displayDuration: 1500,
        autoHide: true
    }

    this.contentTemplates = {...this.predefined,...templates};
    this.setup = {...this.default,...setup};

    // emit new notification
    this.emit = (msg,type) => {
        const nid = crypto.randomUUID();
        this.notificationsList[nid] = {block: this.createNotifier(nid,type)};
        this.showMessage(nid,msg,type);
    }

    // show notification message
    this.showMessage =(id,msg,type) => {
        let block = this.notificationsList[id].block;
        this.addContent(block,msg,type)
        block.style.marginTop = window.pageYOffset + this.setup.units;
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
    this.createNotifier = (id,type) => {
        // read position of the last notification and place new one below it
        const lastArea = [...document.querySelectorAll('.notificationArea')].pop();
        const newPos = lastArea ? (Number(lastArea.getBoundingClientRect().bottom) + this.setup.areaSpacing) : this.setup.topOffset;
        const notificationBlock = document.createElement('div');
        notificationBlock.setAttribute('class',`notificationArea ${type}`);
        notificationBlock.style.top = `${newPos}${this.setup.units}`;
        notificationBlock.style.width = `${this.setup.areaWidth}${this.setup.units}`;
        if (!this.setup.autoHide) {
            notificationBlock.addEventListener('click',() => {this.hideMessage(id)});
            notificationBlock.style.cursor = 'pointer';
            // preven links to hide notification
            [...document.querySelectorAll('.notificationArea a')].forEach((item) => { 
                item.addEventListener('click', (event) => {event.stopPropagation()});
            });
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