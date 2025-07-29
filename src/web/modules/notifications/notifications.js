// ======================== notifications ========================

function Notifications() {
    this.hider;
    this.notificationsList = {};
    this.contentTemplates = {
        default: `<span>%%message%%</span>
            <span data-process="link">
                <span data-type="text">%%content%%</span>
                <a href="%%src%%" data-type="link">%%content%%</a>
            </span>`,
        warning: `<h1>%%message%%</h1>`
    };

    // emit new notification
    this.emit = function(msg,type) {
        const nid = crypto.randomUUID();
        this.notificationsList[nid] = {block: this.createNotifier()};
        this.showMessage(nid,msg,type);
        this.hider = setTimeout(this.hideMessage,3000,nid,this);
    }

    // show notification message
    this.showMessage = function(id,msg,type) {
        let block = this.notificationsList[id].block;
        this.addContent(block,msg,type)
        block.style.marginTop = (window.pageYOffset + 100) + 'px';
        block.style.display = 'block';
        this.slide(this,block,'right',-300,0,3);
    }

     // hide notification message
    this.hideMessage = function(id,that) {
        that.slide(that,that.notificationsList[id].block,'right',0,-400,-3,function(){that.removeNotifier(id)});
    }

    // create notification element
    this.createNotifier = function() {
        // read position of the last notification and place new one below it
        const lastArea = [...document.querySelectorAll('.notificationArea')].pop();
        const newPos = lastArea ? (Number(lastArea.style.top.replace('px','')) + 100) : 0;
        const notificationBlock = document.createElement('div');
        notificationBlock.setAttribute('class',`notificationArea`);
        notificationBlock.setAttribute('style',`top: ${newPos}px`);
        document.getElementsByTagName('body')[0].appendChild(notificationBlock);
        return notificationBlock;
    }

    // add content to notification element
    this.addContent = function(block,msg,type) {
        if (typeof msg == 'string') { // content is a string, add it as is
            block.innerHTML = msg;
        } else if ((msg instanceof Array) || (msg instanceof Object)) {  // content is structured, use template to display it
            let factory = new TemplatingFactory();
            block.innerHTML = (type && this.contentTemplates[type]) ? this.contentTemplates[type] : this.contentTemplates.default;
            factory.renderRoot(block,msg);
        }
    }

    // remove notification element
    this.removeNotifier = function(id) {
        this.notificationsList[id].block.remove();
        delete this.notificationsList[id];
    }

    // slide element
    this.slide = function(that,slider,position,progress,end,step,callback) {
        slider.style[position] = progress + "px"
        if (Math.abs(end - progress) >= Math.abs(step)) {
            progress += step;
            setTimeout(function(){
                that.slide(that,slider,position,progress,end,step,callback);
            },4);
        } else {
            if (callback) callback();
        }
    }
}