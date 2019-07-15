// history
import history from '../history'

// lib
import $ from 'jquery'
var x2js = require('x2js')
var X2JS = new x2js()

// csApi.js
const App = {};
App.api = App.api || {};
App.api.csApi = (function () {

    // var isStopApp = false;

    // eslint-disable-next-line
    String.prototype.bool = function () {
        return (/^true$/i).test(this);
    };

    // app 객체는 CS 환경에서만 존재하므로 방어코드가 필요함
    if (typeof window.app != 'undefined') {
        console.log('app is defined');
        console.log(window.app)
        // 응답콜백은 App.에서 로드한 js파일에 선언되어 있어야 함
        window.app.setMessageCallback('ContainerToApp', function (name, args) {
            // 모든 응답이 이 함수로 들어오기 때문에 별도로 콜백 핸들러를 구현하여 처리하길 권장함
            App.api.csApi.response(args[0]);
        });
    } else {
        console.log('app is undefined');
    }

    /**
     * AppToContainer
     *
     *   CS로 커맨드를 요청할 때 사용함(app.sendMessage)
     *
     */
    function request(xmlString) {
        console.time('duration_getThumbnail');
        if (window.DOMParser) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlString, "text/xml");
            var $xmlDoc = $(xmlDoc);

            if ($xmlDoc.find("parsererror").text()) {
                console.warn("xml 파싱 에러" + $xmlDoc.find("parsererror").text());
                console.log('[CSC send error] xmlString :' + xmlString);
                return;
            }

        }

        var xmlArray = [];

        try {
            console.log('[CSC send] xmlString :' + xmlString);
            // if(window.location.hash == "#pvrLogTest"){
            //     $('._request').text(xmlString);
            // }
        } catch (e) {
            console.log('[CSC ERROR] xmlString :' + e.message);
        }

        xmlArray.push(xmlString);
        if (typeof window.app != 'undefined') {
            window.app.sendMessage('AppToContainer', xmlArray);
        } else {
        }

        // if(localMode && App.vars.isEmulator){
        //     App.api.emulator.setSTBCode($xmlDoc);
        // }
    }


    /**
     * ContainerToApp 응답 콜백 핸들러
     *
     *   sendMessage에 대한 응답 콜백 setMessageCallback 에서 호출하는 핸들러
     *
     */
    function response(data) {
        var xmlDoc;
        console.timeEnd('duration_getThumbnail');
        if (window.DOMParser) {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(data, "text/xml");
        }

        if ($(xmlDoc).find("parsererror").text()) {
            console.warn("xml 파싱 에러" + $(xmlDoc).find("parsererror").text());
            console.log('[CSC receive error] xmlString :' + data);
            return;
        }

        try {
            console.log('[CSC receive] data :' + data);
            // if(window.location.hash == "#pvrLogTest"){
            //     $('._response').text(data);
            // }
        } catch (e) {
            console.log('[CSC ERROR] data :' + e.message);
        }


        //소문자처리

        var $xmlDoc = $(xmlDoc);

        var command = $xmlDoc.find("COMMAND").text().toLowerCase();
        // var contents = $xmlDoc.find("CONTENTS").text().toLowerCase();

        switch (command) {
            case 'startapp' :
                // App.api.csApi.requestStartApp($xmlDoc, xmlDoc);
                console.log($xmlDoc.find("launchInfo historyList history menuId").text())

                // go homeMain
                history.push(process.env.PUBLIC_URL+'homeMain')

                break;
            case 'notifykey' :
                var value = $xmlDoc.find("value").text();
                console.log('notifykey value :: ' + value)
                if(value == 191) {
                    App.api.csApi.stopApp()
                }
                break;
            default :
                break;
        }
    }

    function responseStartApp(result) {
        var opts = {
            TYPE: "response",
            COMMAND: "StartApp",
            DATA: {
                result: "onLoad",
                appVersion: window.appVersion
            }
        };
        opts.DATA.result = result;

        // var xmlString = X2JS.json2xml_str(opts);
        var xmlString = X2JS.js2xml(opts);
        xmlString = "<INTERFACE version='3'>" + xmlString + "</INTERFACE>";

        App.api.csApi.request(xmlString);
    }

    /*window.onload = function () {
        App.api.csApi.responseStartApp("onLoad");
    };*/

    function stopApp() {
        var stopApp = {
            TYPE: "notify",
            COMMAND: "StopApp",
            CONTENTS: "Exit",
            DATA: {}
        };
        // var xmlString2 = X2JS.json2xml_str(stopApp);
        var xmlString2 = X2JS.js2xml(stopApp);
        xmlString2 = "<INTERFACE version='3'>" + xmlString2 + "</INTERFACE>";
        App.api.csApi.request(xmlString2);
    }

    return {
        request: request,
        response: response,
        responseStartApp: responseStartApp,
        stopApp: stopApp
    }

})();

export default App.api.csApi
