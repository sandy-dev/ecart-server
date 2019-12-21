// Image transition
import { render } from 'react-dom'
import React, { Component } from 'react'
import './animation.css'
import { Bg_15, Bg_16, Bg_17, Bg_21 } from '../components/image'
import { Ic_vectr_arr_rt } from '../components/imageSvgs'

const borderItem = '.5vmin solid coral';

const slides = [
    { id: 0, border: borderItem, opacity: 1, text_main: 'AI & machine learning', text_secondary: 'We are starting up' },
    { id: 1, border: borderItem, opacity: 1, text_main: 'Web platform', text_secondary: 'We thrive to ' },//build buisness application
    { id: 2, border: borderItem, opacity: 1, text_main: 'Mobile platform', text_secondary: 'We creating world class ' },//mobile apps
    { id: 3, border: borderItem, opacity: 1, text_main: 'All cross platform', text_secondary: 'Come with a requirement' },//. Be it any platform
]

export class animation11 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            index: 0,
            opacity: 1,
            border: borderItem,
            text: '',
            fontColor: 'black',
            //imgCircle: Ic_cir_black_1
        }

        this.PageRedirect = this.PageRedirect.bind(this)
    }


    PageRedirect(e) {
        e.preventDefault();
        window.location.href = "#dvTechnology";
        history.pushState('', document.title, window.location.pathname);
    }

    render() {

        slides.forEach(function (entry) {
            entry.opacity = 0;
            entry.border = 'none';
        });
        slides[this.state.index].opacity = 1;
        slides[this.state.index].border = borderItem;

        return (
            <div className='img-trans'>
                <div style={{ position: 'relative', zIndex: '2' }}>

                    {/* <div className="half-circle" style={{ opacity: '.8' }}> */}
                    {/* <p style={{ color: this.state.fontColor }}>
                            <img src={this.state.imgCircle} style={{ height: '2vh', width: '2vh' }} />
                            &nbsp; {slides[this.state.index].text_main}
                        </p> */}
                    {/* <p> <b>Platforms: </b> </p> */}
                    {/* 
                    <p style={{ borderBlockEnd: slides[0].border }} >AI&Cloud </p>
                    <p style={{ borderBlockEnd: slides[1].border }} >Web </p>
                    <p style={{ borderBlockEnd: slides[2].border }} >Mobile </p>
                    <p style={{ borderBlockEnd: slides[3].border }} >Others </p> */}
                    {/* <button>
                        <span onClick={this.PageRedirect} style={{ display: 'inline-block' }}>  Check Out </span>
                        <img src={Ic_vectr_arr_rt} style={{ height: 16, width: 16, position: 'relative', top: '3px' }} />
                    </button> */}

                    {/* </div> */}
                </div>
                <img src={Bg_15} className='trans_img' style={{ opacity: slides[0].opacity }} />
                <img src={Bg_16} className='trans_img' style={{ opacity: slides[1].opacity }} />
                <img src={Bg_17} className='trans_img' style={{ opacity: slides[2].opacity }} />
                <img src={Bg_21} className='trans_img' style={{ opacity: slides[3].opacity }} />

            </div>
        )
    }

    componentDidMount() {

        const interval = setInterval(() => {

            this.setState((prevState) => {
                return {
                    index: (prevState.index + 1) % 4,
                    opacity: !(prevState.opacity),
                    fontColor: prevState.index == 0 ? 'white' : 'black',
                    //imgCircle: prevState.index == 0 ? Ic_cir_white_1 : Ic_cir_black_1
                }
            });

        }, 4000);
    }
}

export default animation11
