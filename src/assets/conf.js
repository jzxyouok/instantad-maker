var Component = {
    basepath: 'http://adnew.qq.com/instantad/proj/{PROJ_NAME}/',
    items: {
        '41': '图片',
        '62': '视频',
        '101': '轮播图',
        '21': '按钮'
    },
    availChangeList: {
        '41': ['41', '101', '21'],
        '62': ['62'],
        '101': ['101'],
        '21': ['21']
    },
    id: 1,
    geneId: function() {
        return (new Date).getTime() + '' + this.id++;
    },
    // globalData的部分
    cur_compId: null,
    cur_page: null,
    pagedata: {
    },
    ww: 750, //默认尺寸－宽度
    wh: 1334 //默认尺寸－高度
};

module.exports = Component;
