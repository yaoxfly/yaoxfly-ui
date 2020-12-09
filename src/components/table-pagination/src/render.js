export default {
    functional: true,
    props: {
        row: Object, // 表格的某一行数据
        render: Function, //render方法
        index: Number, //下标
        item: {
            type: Object,
            default: null
        },
        data: Array //表格里所有数据
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index,
            data: ctx.props.data
        }
        if (ctx.props.item) params.item = ctx.props.item
        return ctx.props.render(h, params)
    }
}