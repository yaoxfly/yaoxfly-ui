//组件属性
export const inputUnitChangeComp = {
    props: {
        placeholder: '',
        unit: '元'
    }
}

//组件属性配置
export const inputUnitChangePropsForm = {
    props: {
        placeholder: {
            configName: '占位文本',
            type: 'String',
            component: 'ue-input',
        },
        unit: {
            configName: '单位',
            component: 'ue-select',
            selections: [
                '元', '千元', '万元'
            ].map(label => {
                return { label, value: label }
            })
        },
    }
}

