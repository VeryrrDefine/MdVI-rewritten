const changelog = [
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
            <h3>v{{ log.version }}</h3>
                <li v-for="(change, changeIndex) in log.changes" :key="changeIndex" v-html="change"></li>
            </div>
        </div>
    `
})