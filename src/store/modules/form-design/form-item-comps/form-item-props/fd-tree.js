//组件属性
export const treeComp = {
    props: {
        data: [
            {
                id: 1,
                label: '一级 1',
                disabled: true, //设置某个节点不能被选择
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }]
                }]
            },
            {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1',
                    children: [{
                        id: 6,
                        label: '三级 2-1-1',

                    }]
                }, {
                    id: 3,
                    label: '二级 2-2',

                    children: [{
                        id: 7,
                        label: '三级 2-2-1'
                    }]
                }]
            },
            {
                label: '一级 3',
                id: 8,
                children: [{
                    id: 10,
                    label: '二级 3-1',
                    children: [{
                        id: 11,
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    id: 12,
                    children: [{
                        id: 13,
                        label: '三级 3-2-1'
                    }]
                }]
            }
        ],
        showCheckbox: false,
        props: { label: 'label', children: 'children', isLeaf: false },
        nodeKey: 'id',
        highlightCurrent: true,
        width: '100%',
        onlyLeaf: true,
        operate: true,
        operateColor: '',
        isShowFilter: true
    }
}



//组件属性配置
export const treePropsForm = {
    props: {
        data: {
            type: 'Array',
            component: 'code-editor',
            btnLabel: '设置树的静态数据',
            mode: 'application/json'
        },
        showCheckbox: {
            configName: '节点是否可被选择',
            type: 'Boolean',
            component: 'ue-switch',
        },
        props: {
            type: 'Object',
            component: 'code-editor',
            btnLabel: '设置props属性',
            mode: 'application/json'
        },
        nodeKey: {
            type: 'String',
            component: 'ue-input',
            configName: '设置nodeKey属性',
        },
        highlightCurrent: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '是否高亮当前选中节点',
        },
        width: {
            type: 'String',
            component: 'ue-input',
            configName: '树的宽度',
        },
        onlyLeaf: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '是否只选中、高亮、编辑叶子节点',
        },
        operate: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '是否显示 添加、删除、编辑等按钮',
        },
        operateColor: {
            type: 'String',
            component: 'ue-input',
            configName: '设置添加、删除、编辑等按钮的颜色',
        },
        isShowFilter: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '是否开启节点过滤',
        }
    }
}