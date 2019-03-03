import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Title extends Component {
    handleClickTitle(word,e) {
        console.log(this,word);
    }
    //直接打印this为空
    //可以用bind传入this后再打印，也可以同时传参数进去

    /*这些 on* 的事件监听只能用在普通的 HTML 的标签上，
    而不能用在组件标签上*/

    render() {
        return (
            <h1 onClick={this.handleClickTitle.bind(this,'hello')}>
                React 小书
            </h1>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <div>
                <Title/>
                <h2>This is Header</h2>
            </div>
        )
    }
}

class Main extends Component {
    render() {
        return (
            <div>
                <h2>This is main content</h2>
            </div>
        )
    }
}

class Footer extends Component {
    render() {
        return (
            <div>
                <h2>This is footer</h2>
            </div>
        )
    }
}

class Index extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}

/*
//render使用1
class Header extends Component {
    renderGoodWord(goodWord, badWord) {
        const isGoodWord = true;
        return isGoodWord ? goodWord : badWord;
    }

    render() {
        const isGoodWord = true;
        //条件返回
        return (
            <div>
                <h1>
                    React 小书
                    {this.renderGoodWord(
                        <strong> is good</strong>,
                        <span> is not good</span>
                    )}
                </h1>
            </div>
        )
    }
}*/

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
);
