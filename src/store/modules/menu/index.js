const state = {
    //是否展开收缩
    collapse: false,
    //页签数据
    tagViewsData: {}
}
const mutations = {
    //设置collapse
    SET_COLLAPSE: (state, param) => {
        state.collapse = param
    },
    // 设置tagViews
    SET_TAG_VIEWS_DATA: (state, param) => {
        state.tagViewsData = param
    },
}
const actions = {}
const getters = {}
// 不要忘记把state, mutations等暴露出去。
export default {
    state,
    mutations,
    actions,
    getters
}

