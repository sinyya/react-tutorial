// history
import history from '../../history'

// lib
import $ from 'jquery'
var x2js = require('x2js')
var X2JS = new x2js()

// app css 환경에서 존재함
// eslint-disable-next-line
var app = app || undefined;

// csApi.js
const App = {};
App.api = App.api || {};
App.api.csApi = (function () {

    // var isStopApp = false;

    // app 객체는 CS 환경에서만 존재하므로 방어코드가 필요함
    if (typeof app != 'undefined') {
        // 응답콜백은 App.에서 로드한 js파일에 선언되어 있어야 함
        app.setMessageCallback('ContainerToApp', function (name, args) {
            // 모든 응답이 이 함수로 들어오기 때문에 별도로 콜백 핸들러를 구현하여 처리하길 권장함
            App.api.csApi.response(args[0]);
        });
    }

    // eslint-disable-next-line
    String.prototype.bool = function () {
        return (/^true$/i).test(this);
    };


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
        if (typeof app != 'undefined') {
            app.sendMessage('AppToContainer', xmlArray);
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
                history.push('/homeMain')

                break;
            default :
                break;
        }
    }


    /*
    function requestStartApp($xmlDoc, xmlDoc) {

        var nodeGroupId = $xmlDoc.find("nodeGroupId").text();
        var stbModel = $xmlDoc.find("stbModel").text();
        var macAddress = $xmlDoc.find("macAddress").text();
        var superCasId = $xmlDoc.find("superCasId").text();
        var subscriberId = $xmlDoc.find("subscriberId").text();
        var smartCardId = $xmlDoc.find("smartCardId").text();
        var groupBits = $xmlDoc.find("groupBits").text();
        var soCode = $xmlDoc.find("soCode").text();
        var cugGroupId = $xmlDoc.find("cugGroupId").text();
        var mapId = $xmlDoc.find("mapId").text();
        var soLogLevel = $xmlDoc.find("soLogLevel").text();
        var enableLog = $xmlDoc.find("enableLog").text();
        var urlPopServer = $xmlDoc.find("urlPopServer").text();
        var urlGatherServer = $xmlDoc.find("urlGatherServer").text();
        var vodAdultMenuCheck = $xmlDoc.find("vodAdultMenuCheck").text();
        var rating = $xmlDoc.find("deviceInfo rating").text();
        var simplePurchase = $xmlDoc.find("simplePurchase").text();
        var isKids = $xmlDoc.find("isKids").text();
        var isChannelMode = $xmlDoc.find("channelMode").text();
        var voiceGuide = $xmlDoc.find("voiceGuide").text();
        var voiceGuideDesc = $xmlDoc.find("voiceGuideDesc").text();
        var multiView = $xmlDoc.find("multiView").text();
        var stbRegCode = $xmlDoc.find("stbRegCode").text();
        var vodWatching = $xmlDoc.find("vodWatching").text();
        var privateAgreement = $xmlDoc.find("privateAgreement").text();
        var marketingAgreement = $xmlDoc.find("marketingAgreement").text();
        var speechBubble = $xmlDoc.find("speechBubble").text();
        var extInfo = $xmlDoc.find("launchInfo extInfo").text();
        var sourceId = $xmlDoc.find("deviceInfo sourceId").text();
        var appId = $xmlDoc.find("launchInfo appId").text();
        // var isEOF = $xmlDoc.find("deviceInfo isEOF").text();
        // var vodwatching = $xmlDoc.find("deviceInfo vodwatching").text();
        // var nextWatchId = $xmlDoc.find("deviceInfo nextWatchId").text();
        // var totalDuration = $xmlDoc.find("deviceInfo totalDuration").text();
        // var currentDuration = $xmlDoc.find("deviceInfo currentDuration").text();
        var cugChannel = $xmlDoc.find("cugChannel").text();

        App.config.settopInfo.nodeGroupId = nodeGroupId;
        App.config.settopInfo.stbModel = stbModel;
        App.config.settopInfo.macAddress = macAddress;
        App.config.settopInfo.superCasId = superCasId;
        //live 모드 일때 변경 필요
        App.config.settopInfo.subscriberId = subscriberId;
        App.config.settopInfo.smartCardId = smartCardId;
        App.config.settopInfo.groupBits = groupBits;
        App.config.settopInfo.soCode = soCode;
        App.config.settopInfo.cugGroupId = cugGroupId;
        App.config.settopInfo.mapId = mapId;
        App.config.settopInfo.soLogLevel = soLogLevel;
        App.config.settopInfo.enableLog = enableLog;
        App.config.settopInfo.urlPopServer = urlPopServer;
        App.config.settopInfo.urlGatherServer = urlGatherServer;
        App.api.logApi._serverIp = urlGatherServer;
        App.api.logApi._serverUrl = App.api.logApi._serverIp;
        App.config.settopInfo.vodAdultMenuCheck = vodAdultMenuCheck;
        App.config.settopInfo.rating = rating;
        App.config.settopInfo.simplePurchase = simplePurchase;
        App.config.settopInfo.isKids = isKids;
        App.config.settopInfo.channelMode = isChannelMode;
        App.config.settopInfo.voiceGuide = voiceGuide;
        App.config.settopInfo.voiceGuideDesc = voiceGuideDesc;
        App.config.settopInfo.multiView = multiView;
        App.config.settopInfo.stbRegCode = stbRegCode;
        App.config.settopInfo.vodWatching = vodWatching;
        App.config.settopInfo.privateAgreement = privateAgreement;
        App.config.settopInfo.marketingAgreement = marketingAgreement;
        App.config.settopInfo.speechBubble = speechBubble;
        App.config.settopInfo.sourceId = sourceId;
        // App.config.settopInfo.isEOF = isEOF;
        // App.config.settopInfo.vodwatching = vodwatching;
        // App.config.settopInfo.nextWatchId = nextWatchId;
        // App.config.settopInfo.totalDuration = totalDuration;
        // App.config.settopInfo.currentDuration = currentDuration;
        App.config.settopInfo.cugChannel = cugChannel;

        App.provider.stb.uhdStb.forEach(function (str,idx) {
            if (str == stbModel) {
                App.config.settopInfo.stbModelResolution = "UHD";
            }
        })

       // 애니메이션 모드 처리
        App.provider.stb.animationSettopBox.forEach(function (str,idx) {
          if (str == stbModel) {
             App.vars.modeAnimation = true;
          }
       });

        App.config.csAppId = appId;

        // 샘플 그룹비트
        // B2B
        // App.config.settopInfo.groupBits = "AAAAAAAQAAAAAAAAAAAAAAAAAAAAAAGAAAgAAAAAAAA=";
        // 일반사용자
        // App.config.settopInfo.groupBits = "AAAAAAAQAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAA=";


        /!*
            이용약관 : 185
            선개통 처리 : 186
        *!/
        var _groupBits = Base64.base64ToBase16(App.config.settopInfo.groupBits);

        /!**
         * groupBitsB2B
         * @type {string}
         * @private
         *!/
        var _B2BGroupBits = parseInt(_groupBits.slice(45, 46), 16).toString(2);

        var zero = '';
        var digits = 4;
        var n = _B2BGroupBits;
        n = n.toString();

        if (_B2BGroupBits.length < digits) {
            for (var i = 0; i < digits - _B2BGroupBits.length; i++)
                zero += '0';
        }

        _B2BGroupBits = zero + _B2BGroupBits;

        App.config.settopInfo.groupBitsB2B = _B2BGroupBits.slice(3, 4); //183번째 B2B사용자


        /!**
         * _agreementGroupBits
         * @type {string}
         * @private
         *!/
        var _agreementGroupBits = parseInt(_groupBits.slice(46, 47), 16).toString(2);

        var zero = '';
        var digits = 4;
        var n = _agreementGroupBits;
        n = n.toString();

        if (_agreementGroupBits.length < digits) {
            for (var i = 0; i < digits - _agreementGroupBits.length; i++)
                zero += '0';
        }

        _agreementGroupBits = zero + _agreementGroupBits;

        App.config.settopInfo.groupBitsAgreement = _agreementGroupBits.slice(1, 2); //185번째 이용약관
        App.config.settopInfo.groupBitsOpening = _agreementGroupBits.slice(2, 3);  //186번째 선 개통


        /!**
         * groupBitsPopup
         * @type {string}
         * @private
         *!/
        var _popupGroupBits = parseInt(_groupBits.slice(51, 52), 16).toString(2);

        var zero = '';
        var digits = 4;
        var n = _popupGroupBits;
        n = n.toString();

        if (_popupGroupBits.length < digits) {
            for (var i = 0; i < digits - _popupGroupBits.length; i++)
                zero += '0';
        }

        _popupGroupBits = zero + _popupGroupBits;

        App.config.settopInfo.groupBitsPopup = _popupGroupBits.slice(0, 1); //204번째 이용약관


        // noLogGroupBits 184번째
        var _noLogGroupBits = parseInt(_groupBits.slice(46, 47), 16).toString(2);

        var zero = '';
        var digits = 4;
        var n = _noLogGroupBits;
        n = n.toString();

        if (_noLogGroupBits.length < digits) {
            for (var i = 0; i < digits - _noLogGroupBits.length; i++)
                zero += '0';
        }

        _noLogGroupBits = zero + _noLogGroupBits;

        App.config.settopInfo.groupBitsNoLog = _noLogGroupBits.slice(0, 1); //184번째






        /!**
         * _pvrGroupBits
         * @type {string}
         * @private
         *!/
        var _pvrGroupBits = parseInt(_groupBits.slice(43, 44), 16).toString(2);

        var zero = '';
        var digits = 4;
        var n = _pvrGroupBits;
        n = n.toString();

        if (_pvrGroupBits.length < digits) {
            for (var i = 0; i < digits - _pvrGroupBits.length; i++)
                zero += '0';
        }

        _pvrGroupBits = zero + _pvrGroupBits;

        App.config.settopInfo.groupBitsPvrJoin = _pvrGroupBits.slice(3, 4); //175번째 PVR 셋탑


        // var _pvrGroupBits = parseInt(_groupBits.slice(44, 45), 16).toString(2);
        //
        // var zero = '';
        // var digits = 4;
        // var n = _pvrGroupBits;
        // n = n.toString();
        //
        // if (_pvrGroupBits.length < digits) {
        //     for (var i = 0; i < digits - _pvrGroupBits.length; i++)
        //         zero += '0';
        // }
        //
        // _pvrGroupBits = zero + _pvrGroupBits;
        //
        // App.config.settopInfo.groupBitsPvrJoin = _pvrGroupBits.slice(0, 1); //176번째 PVR 셋탑

        /!**
         * EPG xml에 history 없을 때 방어로직
         * stopApp
         *!/
        try {
            App.vars.startApp = X2JS.xml2json(xmlDoc);

            var launchInfoHistorys = App.vars.startApp.INTERFACE.DATA.launchInfo.historyList;

            var keys = Object.keys(launchInfoHistorys.history);

            if (launchInfoHistorys.history[0] === undefined) {
                for (var i = 0; i < keys.length; i++) {
                    if (launchInfoHistorys.history[keys[i]] == "true") {
                        launchInfoHistorys.history[keys[i]] = true;
                    } else if (launchInfoHistorys.history[keys[i]] == "false") {
                        launchInfoHistorys.history[keys[i]] = false;
                    }

                    if (typeof launchInfoHistorys.history[keys[i]] === "object") {
                        var keysJ = Object.keys(launchInfoHistorys.history[keys[i]]);
                        for (var j = 0; j < keysJ.length; j++) {

                            if (launchInfoHistorys.history[keys[i]][keysJ[j]] == "true") {
                                launchInfoHistorys.history[keys[i]][keysJ[j]] = true;
                            } else if (launchInfoHistorys.history[keys[i]][keysJ[j]] == "false") {
                                launchInfoHistorys.history[keys[i]][keysJ[j]] = false;
                            }

                            if (typeof launchInfoHistorys.history[keys[i]][keysJ[j]] === "object") {
                                var keysK = Object.keys(launchInfoHistorys.history[keys[i]][keysJ[j]]);
                                for (var k = 0; k < keysK.length; k++) {

                                    if (launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]] == "true") {
                                        launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]] = true;
                                    } else if (launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]] == "false") {
                                        launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]] = false;
                                    }

                                    if (typeof launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]] === "object") {
                                        var keysL = Object.keys(launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]]);
                                        for (var l = 0; l < keysL.length; l++) {

                                            if (launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]][keysL[l]] == "true") {
                                                launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]][keysL[l]] = true;
                                            } else if (launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]][keysL[l]] == "false") {
                                                launchInfoHistorys.history[keys[i]][keysJ[j]][keysK[k]][keysL[l]] = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                for (var j = 0; j < keys.length; j++) {
                    console.log(launchInfoHistorys.history[j]);

                    if (launchInfoHistorys.history[j] == "true") {
                        launchInfoHistorys.history[j] = true;
                    } else if (launchInfoHistorys.history[j] == "false") {
                        launchInfoHistorys.history[j] = false;
                    }

                    if (typeof launchInfoHistorys.history[j] === "object") {
                        var keysJ = Object.keys(launchInfoHistorys.history[j]);
                        for (var i = 0; i < keysJ.length; i++) {
                            console.log(launchInfoHistorys.history[j][keysJ[i]]);

                            if (launchInfoHistorys.history[j][keysJ[i]] == "true") {
                                launchInfoHistorys.history[j][keysJ[i]] = true;
                            } else if (launchInfoHistorys.history[j][keysJ[i]] == "false") {
                                launchInfoHistorys.history[j][keysJ[i]] = false;
                            }

                            if (typeof launchInfoHistorys.history[j][keysJ[i]] === "object") {
                                var keysK = Object.keys(launchInfoHistorys.history[j][keysJ[i]]);
                                for (var k = 0; k < keysK.length; k++) {
                                    console.log(launchInfoHistorys.history[j][keysJ[i]][keysK[k]]);

                                    if (launchInfoHistorys.history[j][keysJ[i]][keysK[k]] == "true") {
                                        launchInfoHistorys.history[j][keysJ[i]][keysK[k]] = true;
                                    } else if (launchInfoHistorys.history[j][keysJ[i]][keysK[k]] == "false") {
                                        launchInfoHistorys.history[j][keysJ[i]][keysK[k]] = false;
                                    }

                                    if (typeof launchInfoHistorys.history[j][keysJ[i]][keysK[k]] === "object") {
                                        var keysL = Object.keys(launchInfoHistorys.history[j][keysJ[i]][keysK[k]]);
                                        for (var l = 0; l < keysL.length; l++) {
                                            console.log(launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]]);

                                            if (launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]] == "true") {
                                                launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]] = true;
                                            } else if (launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]] == "false") {
                                                launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]] = false;
                                            }

                                            if (typeof launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]] === "object") {
                                                var keysM = Object.keys(launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]]);
                                                for (var m = 0; m < keysM.length; m++) {
                                                    console.log(launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]][keysM[m]]);

                                                    if (launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]][keysM[m]] == "true") {
                                                        launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]][keysM[m]] = true;
                                                    } else if (launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]][keysM[m]] == "false") {
                                                        launchInfoHistorys.history[j][keysJ[i]][keysK[k]][keysL[l]][keysM[m]] = false;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            console.log(launchInfoHistorys);

            if (launchInfoHistorys.history.userEventCode != undefined) {
                App.vars.userEventCode = launchInfoHistorys.history.userEventCode;
            }
            if (launchInfoHistorys.history.sourceId != undefined) {
                App.vars.sourceId = launchInfoHistorys.history.sourceId;
            }

            /!**
             * screenContext
             * CSP환경에서 VOICEABLE 연동 선언, 서버 config 연동 테스트 필요
             *!/
            if(App.fn.globalUtil.is("VOICE") == true){
                // VUX 실행중인지 확인
                // 초기화
                // todo EPG 연결파트 구현 시 sessionTimeout​ 은 true로 변경 필요
                App.voiceableManager.init('cjhv', App.vars.screenContextProfile);
                // startVux 확인하기
                App.api.csApi.getStartedVux();
            }

            // var launchInfoHistorys = X2JS.xml2json($xmlDoc.find("launchInfo historyList")[0]);
            // var backInfoHistorys = X2JS.xml2json($xmlDoc.find("backInfo historyList")[0]);

            var appId = $xmlDoc.find("launchInfo>appId").text();
            var subAppId = $xmlDoc.find("launchInfo>subAppId").text();

            //1. 모드셋에 appId와 launchInfo에 appId 가 다르면 무조껀 다른 앱으로 이동
            //2. subAppId가 0이 아니면 무조껀 다른 앱으로 이동
            App.api.multiview.serviceAlarm({
                callback : function(data){
                    if (!channelMode) {
                        /!**
                         * Main App용 소스
                         *!/
                        if (subAppId != 0) { //채널
                            $.ajax({
                                url: "../../gateway_json/applist-live-v1.0.json",
                                type: 'GET',
                                dataType: "json",
                                success: function (jdata, errorString, code) {
                                    var jdata = jdata;
                                    var flag = false;
                                    for (var type in jdata) {
                                        if (jdata.hasOwnProperty(type)) {
                                            if (jdata[type].appId == appId && jdata[type].subAppId == subAppId) {
                                                App.api.csApi.launchCSAppResponse({result: "true"});
                                                setTimeout(function () {
                                                    location.href = jdata[type].url;
                                                }, 500);
                                                flag = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (!flag) {
                                        //장애시나리오 작업하세요
                                        App.api.csApi.launchCSAppResponse({result: "false"});
                                    }
                                    // App.api.csApi.launchCSAppResponse({result : "true"});
                                },
                                error: function (request, status) {
                                    //장애시나리오 작업하세요
                                    console.log("gateway_json/applist-live-v1.0_test.json 로드 실패");
                                }
                            });
                            // App.api.csApi.launchCSAppResponse({result : "true"});
                        } else {
                            if (launchInfoHistorys.history[0] === undefined) {
                                var menuId = launchInfoHistorys.history.menuId;
                            } else {
                                var menuId = launchInfoHistorys.history[0].menuId;
                            }


                            if (menuId == "9999") {
                                location.hash = $xmlDoc.find("launchInfo menuName").text();

                            } else {
                                if (launchInfoHistorys.history[0] === undefined) {
                                    launchInfoHistorys.history.startApp = true
                                    App.router.callMenu(launchInfoHistorys.history);
                                } else {
                                    launchInfoHistorys.history[0].startApp = true
                                    App.router.callMenu(launchInfoHistorys.history[0]);
                                    launchInfoHistorys.history.shift();
                                    App.historyApp.setHistoryArray(launchInfoHistorys.history);
                                }
                                if (menuId == "101") {
                                    // App.api.csApi.startAnimation(animation.ani_main_home_SlideIn);
                                    animation.homebg = true;
                                }
                            }
                            App.api.csApi.responseStartApp("true");
                        }
                    } else {
                        /!**
                         * Channel App 용 소스
                         *!/
                        if (launchInfoHistorys.history[0] === undefined) {
                            var menuId = launchInfoHistorys.history.menuId;
                        } else {
                            var menuId = launchInfoHistorys.history[0].menuId;
                        }

                        if (menuId == "9999") {
                            location.hash = $xmlDoc.find("launchInfo menuName").text();

                        } else {
                            if (launchInfoHistorys.history[0] === undefined) {
                                launchInfoHistorys.history.startApp = true
                                App.router.callMenu(launchInfoHistorys.history);
                            } else {
                                launchInfoHistorys.history[0].startApp = true
                                App.router.callMenu(launchInfoHistorys.history[0]);
                                launchInfoHistorys.history.shift();
                                App.historyApp.setHistoryArray(launchInfoHistorys.history);
                            }
                            if (menuId == "101") {
                                App.api.csApi.startAnimation(animation.ani_main_home_SlideIn);
                                animation.homebg = true;
                            }
                        }
                        App.api.csApi.responseStartApp("true");
                    }
                }
            });
        } catch (e) {
            App.api.fn.stopApp();
        }
    }
*/

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
