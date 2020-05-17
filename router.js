var express = require('express')
var router = express.Router()

// create a tcp modbus client
const Modbus = require('jsmodbus')
const net = require('net')
const socket = new net.Socket()
const client = new Modbus.client.TCP(socket, 255)
const options = {
    'host': '10.62.20.230',
    'port': 502
}

var heartTick = null

function heartBeat(register) {
    console.log('heart tick...')
    client.readHoldingRegisters(register, 1)
        .then(function (resp) {
            console.log('心跳任务中读保持寄存器成功')
            console.log(resp.response.body.valuesAsArray)
        })
}

socket.on('connect', function () {
    var hearBeatHandler = setInterval(heartBeat, 4000, 10601)
    heartTick = hearBeatHandler
    console.log('socket is connected.')
})

socket.on('error', (err) => {
    throw err
})

router.get('/api/getnewslist', function (req, res) {
    var newsList = [{
            id: 13,
            title: "基于RobustVPN的设备远程运维服务，助您“疫”“战”到底",
            add_time: "2018-04-16T03:50:28.000Z",
            zhaiyao: "快发布了",
            click: 23,
            img_url: "https://www.danfoss.com/media/7728/vlt_lvd_automationdrivefc301_fc302.jpg?anchor=center&mode=scale&width=150"
        },
        {
            id: 14,
            title: "国产变频器的市场现状",
            add_time: "2018-07-24T02:22:12.000Z",
            zhaiyao: "快发布了",
            click: 18,
            img_url: "https://www.danfoss.com/media/5047/fcp106_transparent-motor_1120x747.jpg?anchor=center&mode=scale&width=515"
        }, {
            id: 15,
            title: "Viking即将发布",
            add_time: "2018-04-16T03:50:28.000Z",
            zhaiyao: "快发布了",
            click: 23,
            img_url: "https://www.danfoss.com/media/7728/vlt_lvd_automationdrivefc301_fc302.jpg?anchor=center&mode=scale&width=150"
        },
        {
            id: 16,
            title: "国产变频器的市场现状",
            add_time: "2018-07-24T02:22:12.000Z",
            zhaiyao: "快发布了",
            click: 18,
            img_url: "https://www.danfoss.com/media/5047/fcp106_transparent-motor_1120x747.jpg?anchor=center&mode=scale&width=515"
        },
        {
            id: 17,
            title: "Viking即将发布",
            add_time: "2018-04-16T03:50:28.000Z",
            zhaiyao: "快发布了",
            click: 23,
            img_url: "https://www.danfoss.com/media/7728/vlt_lvd_automationdrivefc301_fc302.jpg?anchor=center&mode=scale&width=150"
        },
        {
            id: 18,
            title: "国产变频器的市场现状",
            add_time: "2018-07-24T02:22:12.000Z",
            zhaiyao: "快发布了",
            click: 18,
            img_url: "https://www.danfoss.com/media/5047/fcp106_transparent-motor_1120x747.jpg?anchor=center&mode=scale&width=515"
        },
        {
            id: 19,
            title: "Viking即将发布",
            add_time: "2018-04-16T03:50:28.000Z",
            zhaiyao: "快发布了",
            click: 23,
            img_url: "https://www.danfoss.com/media/7728/vlt_lvd_automationdrivefc301_fc302.jpg?anchor=center&mode=scale&width=150"
        },
        {
            id: 20,
            title: "国产变频器的市场现状",
            add_time: "2018-07-24T02:22:12.000Z",
            zhaiyao: "快发布了",
            click: 18,
            img_url: "https://www.danfoss.com/media/5047/fcp106_transparent-motor_1120x747.jpg?anchor=center&mode=scale&width=515"
        },
        {
            id: 21,
            title: "Viking即将发布",
            add_time: "2018-04-16T03:50:28.000Z",
            zhaiyao: "快发布了",
            click: 23,
            img_url: "https://www.danfoss.com/media/7728/vlt_lvd_automationdrivefc301_fc302.jpg?anchor=center&mode=scale&width=150"
        },
        {
            id: 22,
            title: "国产变频器的市场现状",
            add_time: "2018-07-24T02:22:12.000Z",
            zhaiyao: "快发布了",
            click: 18,
            img_url: "https://www.danfoss.com/media/5047/fcp106_transparent-motor_1120x747.jpg?anchor=center&mode=scale&width=515"
        },
        {
            id: 23,
            title: "xxxxxxx",
            add_time: "2018-07-24T02:22:12.000Z",
            zhaiyao: "xxxxxx快发布了",
            click: 18,
            img_url: "https://www.danfoss.com/media/5047/fcp106_transparent-motor_1120x747.jpg?anchor=center&mode=scale&width=515"
        },

    ]

    res.setHeader("Access-Control-Allow-Origin", "*")
    return res.status(200).json({
        err_code: 0,
        message: newsList
    })
})

router.get('/api/getnewsinfo', function (req, res) {
    console.log('前端请求新闻详情了')
    console.log(parseInt(req.query.news_id))
    console.log(req.hostname)
    if (parseInt(req.query.news_id) != 0) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            data: {
                id: 123,
                title: "基于RobustVPN的设备远程运维服务，助您“疫”“战”到底",
                click: 8989,
                add_time: "2020-09-20T20:29:30.000Z",
                content: "<p>新型冠状病毒肺炎这场来势汹汹的疫情之战，在全国人民的共同奋战之下，“敌人”节节败退，国内疫情逐渐好转，但海外疫情越发严峻，我们仍不可掉以轻心。</p>" +
                    "<p>&nbsp;</p>" + "<p>疫情之下，工厂智能化、自动化、无人化应用显得尤为重要，当企业前端生产人员供给不足，后端设备维护供应不上，复工复产步伐就会受阻。在全球疫情全面解除前，企业如何高效地兼顾生产和管理是关键。</p>" +
                    "<p><strong>为什么需要远程运维服务？</strong></p>" + "<p>疫情爆发期间，由于交通、人员的限制，企业维护人员到岗率较低，设备维修响应时间长。复工复产之时，为保障员工安全健康，故障发生时，现场运维受限制。<hr/> <p>&nbsp;</p>" +
                    "<p>RobustVPN是鲁邦通对VPN技术的应用，通过RobustVPN可以实现设备远程运维服务，提升工程师的时间价值，足不出户即可完成运维工作。</p>" +
                    "<p style='text-align: center;'><img src='http://upload.gongkong.com/Upload/gongkong/baiduEditorImage/202004/01/31e975801eac48f9af198c0225cca58d_w.png' title='RobustVPN远程运维拓扑图.png' alt='RobustVPN远程运维拓扑图.png'></p>" +
                    "<p>•RCMS云平台通过直观的UI设计和流畅的上机处理，实现快速设备部署和海量设备管理；</p>" +
                    "<p>•RCMS云平台用灵活、安全、低成本的方式采集、存储和分析设备数据，实现用户与工业物联网之间的互联互动；</p>" +
                    "<p>&nbsp;&nbsp;&nbsp;&nbsp;</p>"
            },
            message: 'get newsinfo succeed.'
        })
    }
})

router.get('/api/getcomments', function (req, res) {
    console.log('前端请求评论了')
    console.log(parseInt(req.query.pageindex))
    console.log(parseInt(req.query.news_id))
    console.log(req.hostname)
    if (parseInt(req.query.news_id) != 0 && parseInt(req.query.pageindex) == 1) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            data: [{
                user_name: "wenliang1",
                add_time: "2012-09-09T02:01:56.000Z",
                content: "啥也不说1"
            }, {
                user_name: "wenliang2",
                add_time: "2012-09-09T20:02:56.000Z",
                content: ""
            }, {
                user_name: "wenliang3",
                add_time: "2012-09-09T20:03:56.000Z",
                content: "啥也不说3"
            }, {
                user_name: "wenliang4",
                add_time: "2012-09-09T20:04:56.000Z",
                content: "啥也不说1"
            }, {
                user_name: "wenliang5",
                add_time: "2012-09-09T20:05:56.000Z",
                content: "啥也不说2"
            }, {
                user_name: "wenliang6",
                add_time: "2012-09-09T20:06:56.000Z",
                content: "啥也不说3"
            }, {
                user_name: "wenliang7",
                add_time: "2012-09-09T20:07:56.000Z",
                content: "啥也不说1"
            }, {
                user_name: "wenliang8",
                add_time: "2012-09-09T20:08:56.000Z",
                content: "啥也不说2"
            }, {
                user_name: "wenliang9",
                add_time: "2012-09-09T20:09:56.000Z",
                content: "啥也不说3"
            }, {
                user_name: "wenliang10",
                add_time: "2012-09-09T20:10:56.000Z",
                content: "啥也不说1"
            }],
            message: '请求评论成功。'
        })
    } else if ((req.query.news_id) != 0 && parseInt(req.query.pageindex) == 2) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            data: [{
                user_name: "wenliang11",
                add_time: "2012-09-09T02:01:56.000Z",
                content: "我是第二页的第一个评论"
            }, {
                user_name: "wenliang12",
                add_time: "2012-09-09T20:02:56.000Z",
                content: "我是第二页的第二个评论"
            }, {
                user_name: "wenliang13",
                add_time: "2012-09-09T20:03:56.000Z",
                content: "我是第二页的第3个评论"
            }, {
                user_name: "wenliang14",
                add_time: "2012-09-09T20:04:56.000Z",
                content: "我是第二页的第4个评论"
            }],
            message: "第二页评论请求成功。"
        })

    } else {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            data: [],
            message: "第三页评论请求成功。"
        })
    }
})

router.post('/api/postcomment', function (req, res) {
    console.log(req.body)
    if (req.body) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            message: '添加评论成功'
        })
    }
})

router.get('/api/getimgcategory', function (req, res) {
    var cates = [{
        title: "VLT",
        id: 1
    }, {
        title: "Vacon",
        id: 2
    }, {
        title: "Holip",
        id: 3
    }, {
        title: "美图",
        id: 4
    }, {
        title: "风景",
        id: 5
    }]
    res.setHeader("Access-Control-Allow-Origin", "*")
    return res.status(200).json({
        err_code: 0,
        data: cates,
        message: '添加评论成功'
    })
})

router.post('/api/connect', function (req, res) {
    if (req.body.connect == 'true') {
        console.log('请求连接变频器')
        socket.connect(options)

        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            message: 'drive connected.'
        })
    } else {
        console.log('请求断开变频器')
        client.writeSingleRegister(2000, 0)
            .then(function (resp) {
                console.log('writing 0 to register 2000 succeded.')
                console.log(resp.response.body.value)

                client.writeSingleRegister(2002, 0)
                    .then(function (resp) {
                        console.log('writing 0 to register 2002 succeded.')
                        socket.end()
                        clearInterval(heartTick)
                        res.setHeader("Access-Control-Allow-Origin", "*")
                        return res.status(200).json({
                            err_code: -1,
                            message: 'drive disconnected and set to stop and reference 0.'
                        })
                    }).catch(function () {
                        console.log('writing 0 to register 2002 failed.')
                        res.setHeader("Access-Control-Allow-Origin", "*")
                        return res.status(200).json({
                            err_code: 1,
                            message: 'write 0 to drive ref failed.'
                        })
                    })

                // res.setHeader("Access-Control-Allow-Origin", "*")
                // return res.status(200).json({
                //     err_code: 0,
                //     message: 'stop dirve succeeded.'
                // })
            }).catch(function () {
                console.log('writing 0 to register 2000 failed.')
                res.setHeader("Access-Control-Allow-Origin", "*")
                return res.status(200).json({
                    err_code: 1,
                    message: 'stop dirve failed.'
                })
            })
        // res.setHeader("Access-Control-Allow-Origin", "*")
        // return res.status(200).json({
        //     err_code: -1,
        //     message: 'drive disconnected.'
        // })
    }
})

router.get('/api/run', function (req, res) {
    client.writeSingleRegister(2000, 1)
        .then(function (resp) {
            console.log('writing 1 to register 2000 succeded.')
            console.log(resp.response.body.value)
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.status(200).json({
                err_code: 0,
                message: 'run dirve succeeded.'
            })
        }).catch(function () {
            console.log('writing 1 to register 2000 failed.')
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.status(200).json({
                err_code: 1,
                message: 'run dirve failed.'
            })
        })
})

router.get('/api/stop', function (req, res) {
    client.writeSingleRegister(2000, 0)
        .then(function (resp) {
            console.log('writing 0 to register 2000 succeded.')
            console.log(resp.response.body.value)
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.status(200).json({
                err_code: 0,
                message: 'stop dirve succeeded.'
            })
        }).catch(function () {
            console.log('writing 0 to register 2000 failed.')
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.status(200).json({
                err_code: 1,
                message: 'stop dirve failed.'
            })
        })
})

router.post('/api/setRef', function (req, res) {
    console.log((req.body.ref)) //string
    client.writeSingleRegister(2002, 100 * parseInt(req.body.ref))
        .then(function (resp) {
            console.log('writing to register 2002 succeded.')
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.status(200).json({
                err_code: 0,
                message: 'write to drive ref succeeded.'
            })
        }).catch(function () {
            console.log('writing to register 2002 failed.')
            res.setHeader("Access-Control-Allow-Origin", "*")
            return res.status(200).json({
                err_code: 1,
                message: 'write to drive ref failed.'
            })
        })
})

router.get('/api/getimages', function (req, res) {
    console.log('前端请求图片了')
    console.log(parseInt(req.query.cate_id))
    console.log(req.host)
    if (parseInt(req.query.cate_id) === 666) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            data: {
                id: 666,
                title: "Vacon NXC Grid Simulator",
                zhaiyao: "The equipment is used for variable volatge and frequency source also for simulating grid drop. It is widely used to test solor and wind energy generation.",
                img_url: "http://" + req.hostname + ":5000/" + 'public/images/1.jpg'
            },
            message: 'get images succeed.'
        })
    } else if (parseInt(req.query.cate_id) === 0) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            data: [{
                    id: 1,
                    title: "VACON® NXP System Drive",
                    zhaiyao: "是一种经过完善综合配置的共直流母线变频器，可满足重工业需求，连续不停运行，维护时间极短。",
                    img_url: 'https://www.danfoss.com/media/1126/vacon-nxp-system-drive.jpg?anchor=center&mode=scale&width=515'
                }, {
                    id: 2,
                    title: "Welcome to Danfoss",
                    zhaiyao: "Great persons do Great jobs at Great places.",
                    img_url: 'https://www.danfoss.com/media/7000/danfoss-employees.jpg?anchor=center&mode=crop&width=1280&height=420'
                }, {
                    id: 3,
                    title: "Working at Danfoss",
                    zhaiyao: "a nice place to work. isn't it?",
                    img_url: "https://www.danfoss.com/media/6849/man-working-with-laptop-1120x742.jpg?anchor=center&mode=scale&width=810"
                },
                {
                    id: 4,
                    title: "Danfoss valve",
                    zhaiyao: "good quality and good price.",
                    img_url: "https://www.danfoss.com/media/4619/danfoss-ets-colibri-introduction-video.jpg?anchor=center&mode=crop&width=1920&height=420"
                }, {
                    id: 5,
                    title: "VLT® Refrigeration Drive FC 103",
                    zhaiyao: "专用于帮助大幅降低制冷系统的寿命周期成本。它可提高效能和可靠性，提供集成的过程控制功能和专门设计的调试环境，可满足制冷应用的需求。此外，它还设有使用常用制冷术语的安装向导。因此，制冷技术人员和安装人员可轻松、安全地进行安装和调试。",
                    img_url: "https://www.danfoss.com/media/7727/vlt_lvd_refrigerationdrive_fc103.jpg?anchor=center&mode=scale&width=515"
                }
            ],
            message: 'get images succeed.'
        })
    } else if (parseInt(req.query.cate_id) === 1) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            data: [{
                id: 1,
                title: " VLT® Midi Drive FC 280",
                zhaiyao: "达到新的性能水平。通过广泛功能，从新的节省中获益。这些功能旨在以尽可能简单易用的方式安装、使用和维护变频器。",
                img_url: 'https://www.danfoss.com/media/7730/vlt_lvd_midi_drivefc280.jpg?anchor=center&mode=scale&width=515'
            }, {
                id: 2,
                title: "VLT® AutomationDrive FC 301 / FC 302",
                zhaiyao: "此变频器结构坚固，经久耐用，能有效可靠地操作，即使在要求最高的应用和最具挑战性的环境中也是如此。VLT® AutomationDrive 充分利用新数字时代必须提供的所有技术，以确保完全满足客户的应用需求并在整个使用寿命期内优化过程。",
                img_url: 'https://www.danfoss.com/media/7728/vlt_lvd_automationdrivefc301_fc302.jpg?anchor=center&mode=scale&width=515'
            }, {
                id: 3,
                title: "VLT® Integrated Servo Drive ISD® 510",
                zhaiyao: "VLT® Integrated Servo Drive ISD® 510 集伺服电机与伺服驱动器为一体。可在众多应用中提供巨大的优势，如转台、食品和药品的标签、封盖和包装装置。",
                img_url: "https://www.danfoss.com/media/1105/vlt_integrated_servodrive_isd510.jpg?anchor=center&mode=scale&width=150"
            }],
            message: 'get images succeed.'
        })
    } else {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            data: [{
                id: 1,
                title: "Danfoss welcome. 等待后台添加图片中......",
                img_url: "https://www.danfoss.com/static/images/logo.svg"
            }],
            message: 'get images succeed.'
        })
    }
})

router.get('/api/getimageinfo', function (req, res) {
    console.log(parseInt(req.query.photo_id))
    var data = [{
        id: parseInt(req.query.photo_id),
        title: "VACON® NXP DC/DC Converter",
        click: 32,
        add_time: "2015-04-15T04:52:15.000Z",
        content: "为了通过更好地利用能源来提高性能，能源存储装置被越来越多地引入到系统中，以创建混合动力解决方案。目前有各种各样存储方法正在使用，但是，由于电池成本的降低和能量密度的增加，电池被视为当今增长最快、更容易集成的存储介质。DC-DC 变流器可用于连接到电池、超级电容器、燃料电池和太阳能电池板等电源。"
    }]
    if (req.body) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({
            err_code: 0,
            data: data,
            message: '获取图片详情成功'
        })
    }

})

router.get('/api/gettempe', function (req, res) {
    

})

module.exports = router
