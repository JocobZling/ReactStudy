/*阶段1
const button=document.querySelector(".like-btn");
console.log(button);
const buttonText=button.querySelector('.like-text');
let isLiked=false;
button.addEventListener('click',()=>{
    isLiked=!isLiked;
    if(isLiked){
        buttonText.innerHTML='取消';
    }else{
        buttonText.innerHTML='点赞';
    }
},false);*/

/*
阶段二
class LikeButton{
    render(){
        return `
        <button id='like-btn'>
          <span class='like-text'>赞</span>
          <span>👍</span>
        </button>
        `
    }
}
const wrapper = document.querySelector('.wrapper');
const likeButton1 = new LikeButton();
wrapper.innerHTML = likeButton1.render();
const likeButton2 = new LikeButton();
wrapper.innerHTML += likeButton2.render();*/

/*
阶段三
const createDOMFromString = (domString) => {
    const div = document.createElement('div');
    div.innerHTML = domString;
    return div;
};

class LikeButton {
    constructor() {
        this.state = {isLiked: false};
    }

    changeLikeText() {
        const likeText = this.el.querySelector('.like-text');
        this.state.isLiked = !this.state.isLiked;
        likeText.innerHTML = this.state.isLiked ? '取消' : '点赞';
    }

    render() {
        this.el = createDOMFromString(`
        <button id='like-btn'>
          <span class='like-text'>点赞</span>
          <span>👍</span>
        </button>
        `);
        this.el.addEventListener('click', this.changeLikeText.bind(this), false);
        //?bind理解
        return this.el;
    }
}

const wrapper = document.querySelector('.wrapper');
const likeButton1 = new LikeButton();
wrapper.appendChild(likeButton1.render());
const likeButton2 = new LikeButton();
wrapper.appendChild(likeButton2.render());*/

//阶段四优化DOM操作
/*
const createDOMFromString = (domString) => {
    const div = document.createElement('div');
    div.innerHTML = domString;
    return div;
};

class LikeButton {
    constructor() {
        this.state = {isLiked: false};
    }

    setState(state) {
        const oldEl = this.el;
        this.state = state;
        this.el = this.render();
        if (this.onStateChange) this.onStateChange(oldEl, this.el);
        //console.log(state);
    }

    changeLikeText() {
        this.setState({
            isLiked: !this.state.isLiked
        });
    }

    render() {
        this.el = createDOMFromString(`
        <button id='like-btn'>
          <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
          <span>👍</span>
        </button>
        `);
        this.el.addEventListener('click', this.changeLikeText.bind(this), false);
        return this.el;
    }
}

const wrapper = document.querySelector('.wrapper');
const likeButton = new LikeButton();
wrapper.appendChild(likeButton.render());//第一次调用
likeButton.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl);
    //insertBefore() 方法在您指定的已有子节点之前插入新的子节点。
    wrapper.removeChild(oldEl);
    //去掉旧的
};*/

//阶段五 抽出公共组件类
const createDOMFromString = (domString) => {
    const div = document.createElement('div');
    div.innerHTML = domString;
    return div;
};

class Component {
    constructor(props = {}) {
        this.props = props;//作为组件的配置参数
    }

    setState(state) {
        const oldEl = this.el;
        this.state = state;
        this._renderDOM();
        if (this.onStateChange) this.onStateChange(oldEl, this.el);
    }

    _renderDOM() {
        this.el = createDOMFromString(this.render());
        if (this.onClick) {
            this.el.addEventListener('click', this.onClick.bind(this), false);
        }
        return this.el;
        //组件子类继承的时候只需要实现一个返回 HTML 字符串的 render 方法就可以了。
    }
}

const mount = (component, wrapper) => {
    wrapper.appendChild(component._renderDOM());
    component.onStateChange = (oldEl, newEl) => {
        wrapper.insertBefore(newEl, oldEl);
        wrapper.removeChild(oldEl);
    }
};

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {isLiked: false}
    }

    onClick() {
        this.setState({
            isLiked: !this.state.isLiked
        })
    }

    render() {
        return `
        <button class='like-btn' style="background-color: ${this.props.bgColor}">
          <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
          <span>👍</span>
        </button>
      `
    }
}

const wrapper = document.querySelector('.wrapper');
mount(new LikeButton({ bgColor: 'red' }), wrapper);