import LOTTIE from '../resources/lottie_simple_character_anim.json';
import BASE_LOTTIE from '../resources/lottie_anim.json';
import DYNAMIC_BORDERS from '../resources/lottie_dynamic_borders.json';
import MANUAL_BORDERS from '../resources/lottie_manual_borders.json';

import lottie from 'lottie-web';
import {LottiePlayer} from "@lottiefiles/lottie-player";

import LANGUAGES from './library';
import {loadFont} from "./utils";

const lottieFilesPlayer = async () => {
    // SVG Renderer allow us to query the DOM elements
    // but what about performance? It has been issue in the past
    // https://lottiefiles.com/supported-features
    // lottie files claims to support other renderer but it does not seem to work
    // I also don't see how they can add support since they just build on top of lottie-web
    const div = document.createElement('div');
    document.body.appendChild(div);
    const player = new LottiePlayer();
    div.appendChild(player);

    // https://docs.lottiefiles.com/lottie-player/components/lottie-player/properties
    // even though the documentation says that the renderer can be set to svg, html or canvas
    // the API only allows to set svg (which is the default value)
    // @ts-ignore
    player.renderer = 'canvas';
    player.autoplay = true;
    player.loop = true;
    player.webworkers = true;
    // player.controls = true;

    // documentation talks about events which don't seem to exist
    // https://docs.lottiefiles.com/lottie-player/components/lottie-player/events
    // load does not exist
    player.addEventListener("load", (e) => {
        // does not seem to be called
        console.log('player load')
    });
    player.addEventListener("ready", (e) => {
        console.log('player ready')
    });
    player.addEventListener("play", (e) => {
        console.log('player play')
    });
    player.addEventListener("rendered", (e) => {
        console.log('player rendered')
        player.load(LOTTIE);
    });
    player.addEventListener("error", (e) => {
        // does not error out even though certain features are clearly not supported :|
        console.log('player error')
    });
}

const simpleLottie = async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    // this still seems to be the most accurate documentation
    // https://github.com/airbnb/lottie-web/wiki/Features
    const languages = Object.keys(LANGUAGES);
    const {family: fontFamily, url: fontUrl, text, locales, direction} = LANGUAGES[languages[0]];

    // we can change the text
    // LOTTIE.fonts.list[0].origin = 3
    // LOTTIE.fonts.list[0].fPath = fontUrl;
    // LOTTIE.fonts.list[0].fFamily = 'Poppins';
    // LOTTIE.fonts.list[0].fStyle = 'Bold';
    // LOTTIE.fonts.list[0].fName = 'Poppins-Bold';
    // LOTTIE.fonts.list[0].ascent = 75;

    // LOTTIE.layers[0].nm = "This is a test";
    // LOTTIE.layers[0].t.d.k[0].s.f = `Poppins-Bold`;
    // // change text
    // LOTTIE.layers[0].t.d.k[0].s.t = "This is a test\rfrom me";
    // // change color
    // LOTTIE.layers[0].t.d.k[0].s.fc = [0.0, 0.0, 0.0]; // change color
    // // changing the size does not reflow the layout -- it does not take the bounding box into account
    // LOTTIE.layers[0].t.d.k[0].s.s = 12;
    // LOTTIE.layers[0].t.d.k[0].s.lh = (43.2 / 36.0) * 12;

    // NOTE sure how we would blend 2 effects together

    lottie.loadAnimation({
        container: div, // the dom element that will contain the animation
        // lottie-web does not support fonts in canvas mode
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: LOTTIE
    });
}

const dynamicBorders = async () => {
    await loadFont('Webdings', 'http://localhost:8080/resources/Webdings-Regular.ttf');
    await loadFont('Arimo', 'http://localhost:8080/resources/Arimo-Variable.ttf');

    const webDiv = document.createElement('div');
    webDiv.style.fontFamily = 'Webdings';
    webDiv.style.fontSize = '36px';
    webDiv.innerText = 'g';
    document.body.appendChild(webDiv);

    const arimoDiv = document.createElement('div');
    arimoDiv.style.fontFamily = 'Arimo';
    arimoDiv.style.fontSize = '36px';
    arimoDiv.innerText = 'test';
    document.body.appendChild(arimoDiv);

    const div = document.createElement('div');
    document.body.appendChild(div);

    const lottieJSON = DYNAMIC_BORDERS;

    // Error: Cannot read properties of undefined (reading 'sid')
    lottieJSON.fonts.list[0].origin = 0;
    // lottieJSON.fonts.list[0].fPath = 'http://localhost:8080/resources/Webdings-Regular.ttf';
    lottieJSON.fonts.list[0].fFamily = 'Webdings';
    lottieJSON.fonts.list[0].fStyle = 'Regular';
    lottieJSON.fonts.list[0].fName = 'Webdings';
    lottieJSON.fonts.list[0].fClass = 'Webdings';
    //
    lottieJSON.fonts.list[1].origin = 0;
    // lottieJSON.fonts.list[1].fPath = 'http://localhost:8080/resources/Arimo-Variable.ttf';
    lottieJSON.fonts.list[1].fFamily = 'Arimo';
    lottieJSON.fonts.list[1].fStyle = 'Variable';
    lottieJSON.fonts.list[1].fName = 'Arimo';
    lottieJSON.fonts.list[1].fClass = 'Arimo';
    //
    lottieJSON.layers[0].t.d.k[0].s.f = 'Arimo';

    // basic method to get the width of the text
    // https://aereference.com/expressions
    // https://www.provideocoalition.com/deeper_modes_of_expression_part12_text/
    // x = linear(thisLayer.parent.sourceRectAtTime(outPoint - framesToTime(textIndex) - inPoint).width, 0, 5000, 0, 100);
    // y = linear(thisLayer.parent.text.sourceText.style.fontSize, 0, 5000, 0, 100);

    // removing layer 1 works
    // lottieJSON.layers = [lottieJSON.layers[0]]

    // lottieJSON.layers[1].t.a = [];
    console.log(lottieJSON.layers[1].t.a[0]);
    // lottieJSON.layers[1].t.a[0].s.x = "";

    // expressions are not supported on the text range selector
    // lottieJSON.layers[1].t.a[0].s.x = "var $bm_rt = [1.0, 1.0];"

    console.log(lottieJSON)

    lottie.loadAnimation({
        container: div, // the dom element that will contain the animation
        // lottie-web does not support fonts in canvas mode
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: lottieJSON
    });
}

// simpleLottie();
dynamicBorders();