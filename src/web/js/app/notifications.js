// ======================== notofication functionality ========================

function Notifications() {

    this.hider;
    this.notificationsList = {};
    this.contentTemplate = `<span>%%message%%</span>
            <span data-process="link">
                <span data-type="text">%%content%%</span>
                <a href="%%src%%" data-type="link">%%content%%</a>
            </span>`;

    this.emit = function(msg) {
        const nid = crypto.randomUUID();
        this.notificationsList[nid] = {block: this.createNotifier()};
        const msgObj = {msg: {message: msg}};
        this.showMessage(nid,msgObj);
        this.hider = setTimeout(this.hideMessage,3000,nid,this);
    }

    this.showMessage = function(id,msg) {
        let block = this.notificationsList[id].block;
        this.addContent(block, msg)
        block.style.marginTop = (window.pageYOffset + 100) + 'px';
        block.style.display = 'block';
        this.slide(this,block,'right',-300,0,3);
    }

    this.hideMessage = function(id,that) {
        that.slide(that,that.notificationsList[id].block,'right',0,-400,-3,function(){that.removeNotifier(id)});
    }

    this.createNotifier = function() {
        const lastArea = [...document.querySelectorAll('.notificationArea')].pop();
        const newPos = lastArea ? (Number(lastArea.style.top.replace('px','')) + 100) : 0;
        const notificationBlock = document.createElement('div');
        notificationBlock.setAttribute('class',`notificationArea`);
        notificationBlock.setAttribute('style',`top: ${newPos}px`);
        document.getElementsByTagName('body')[0].appendChild(notificationBlock);
        return notificationBlock;
    }

    this.addContent = function(block,msg) {
        let factory = new TemplatingFactory();
        block.innerHTML = this.contentTemplate;
        factory.renderRoot(block,msg);
    }

    this.removeNotifier = function(id) {
        this.notificationsList[id].block.remove();
        delete this.notificationsList[id];
    }

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