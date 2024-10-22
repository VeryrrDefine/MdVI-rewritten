const changelog = [
    {
        version: "2.2.2.2-E", title: "I18N",
        changes: [
            "added English Language(Not Full)<button class=\"btn\" onclick=\"currentLanguage = 1\">Set</button>"
        ]
    },
    {
        version: "2.2.2.1", title: "",
        changes: [
            "修复了因为区分大小写导致的报错"
        ]
    },
    {
        version: "2.2.2", title: "暴涨期",
        changes: [
            "添加了第三个战斗场填充进度条",
            "添加了研究升级",
            "添加了维度提升^3",
            "添加了维度9-16"
        ]
    },
    {
        version: "2.2.1", title: "",
        changes: [
            "添加了里程碑的一部分",
            "添加了次数商店",
            "添加了第二个战斗场填充进度条"
        ]
    },
    {
        version: "2.2.0.2", title: "",
        changes: [
            "修个战斗场的bug"
        ]
    },
    {
        version: "2.2.0.1", title: "",
        changes: [
            "修个战斗场的bug"
        ]
    },
    {
        version: "2.2.0", title: "POWIAINANUM来了！",
        changes: [
            "添加了战斗场",
            "添加了5维的一部分内容：里程碑",
            "替换原来的大数库ExpantaNum.js为PowiainaNum.js"
        ]
    },
    {
        version: "2.1.4", title: "快来了吗？",
        changes: [
            "修复了howAllPrestigeLayers的bug",
            "添加了对维度的超级折算"
        ]
    },
    {
        version: "2.1.3", title: "快来了",
        changes: [
            "添加了一些升级"
        ]
    },
    {
        version: "2.1.2", title: "小朋友：啊米诺斯",
        changes: [
            "修改了部分游戏的效果",
            "添加了1个购买项",
            "移除了部分升级,添加了1个新升级",
            "添加了小朋友",
            "添加了维度提升^2"
        ]
    },
    {
        version: "2.1.1", title: "硬上限：啊，我被封印了，功力只剩一成",
        changes: [
            "添加了6个升级",
            "添加了1个购买项",
            "添加了3个挑战",
            "添加了1个可以移除硬上限的升级"
        ]
    },
    {
        version: "2.1.0", title: "3.3333维体积",
        changes: [
            "添加mm<sup>3</sup>重置",
            "添加自动",
            "添加离线时间"
        ]
    },
    {
        version: "2.0.1", title: "维度提^1.79e308升^1.79e308",
        changes: [
            "添加维度提升"
        ]
    },
    {
        version: "2.0.0", title: "",
        changes: [
            "推倒，然后重写，Just do it!",
            "添加了1-8维度"
        ]
    },
]
Vue.component("changelog", {
    template: `
        <div>
            <div v-for="(log, index) in changelog" :key="index">
            <h3>v{{ log.version }} {{ log.title }}</h3>
                <li v-for="(change, changeIndex) in log.changes" :key="changeIndex" v-html="change"></li>
            </div>
        </div>
    `
})