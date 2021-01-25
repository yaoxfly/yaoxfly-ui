//组件属性
export const dropDownTreeComp = {
    props: {
        data: [
            {
                id: 1,
                label: '一级 1',
                children: [{
                    id: 2,
                    label: '二级 1-1',
                    children: [{
                        id: 3,
                        label: '三级 1-1-1'
                    }
                    ]
                }]
            }, {
                id: 4,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1',
                    children: [{
                        id: 6,
                        label: '三级 2-1-1'
                    }]
                }, {
                    id: 7,
                    label: '二级 2-2',
                    children: [{
                        id: 8,
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                id: 9,
                label: '一级 3',
                children: [{
                    id: 10,
                    label: '二级 3-1',
                    children: [{
                        id: 11,
                        label: '三级 3-1-1'
                    }]
                }, {
                    id: 12,
                    label: '二级 3-2',
                    children: [{
                        id: 13,
                        label: '三级 3-2-1'
                    }]
                }]
            }
        ],
        width: 300,
        columnCollapseTags: false,
        multiple: true,
        onlyLeaf: true,
        props: {
            children: 'children', //指定子树为节点对象的某个属性值
            label: 'label', //指定节点标签为节点对象的某个属性值(下拉菜单显示值的key)
        },
        nodeKey: 'id',
        checkStrictly: true,
        height: 200,
        accordion: false,
        autoExpandParent: true
    }
}

//组件属性配置
export const dropDownTreePropsForm = {
    props: {
        data: {
            type: 'Array',
            component: 'code-editor',
            btnLabel: '设置树的静态数据',
            mode: 'application/json'
        },
        width: {
            type: 'Number',
            component: 'ue-input',
            configName: '宽度',
            step: 1,
            min: 0,
            max: 1920,
        },
        columnCollapseTags: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '多选时按文字的形式自适应展示',
        },
        multiple: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '是否多选',
        },
        onlyLeaf: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '是否只选中和高亮叶子节点',
        },
        props: {
            type: 'Object',
            component: 'code-editor',
            btnLabel: '设置props',
            mode: 'application/json'
        },
        nodeKey: {
            type: 'String',
            component: 'ue-input',
            configName: '树节点唯一标识',
        },
        checkStrictly: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '严格的遵循父子不互相关联',
        },
        height: {
            type: 'Number',
            component: 'ue-input',
            configName: '下拉的高度',
            step: 1,
            min: 0,
            max: 1920,
        },
        accordion: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '只打开一个同级树节点',
        },
        autoExpandParent: {
            type: 'Boolean',
            component: 'ue-switch',
            configName: '自动展开父节点',
        }
    }
}

