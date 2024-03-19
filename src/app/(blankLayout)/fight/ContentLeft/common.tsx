/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2024-03-18 11:27:50
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-19 17:42:03
 */
export const columns = ({}: any) => [
  {
    label: 'id',
    name: 'id',
    formItem: {
      hidden: true,
    },
  },
  {
    label: '上级类别',
    name: 'parentId',
    formItem: {
      type: 'select',
      options: [],
    },
  },
  {
    label: '类别名称',
    name: 'name',
    formItem: {
      rules: [
        {
          required: true,
          message: '请输入类别名称',
        },
        {
          max: 25,
          message: '不能大于25个字符',
        },
      ],
    },
  },
  {
    label: '类别编码',
    name: 'typeCode',
    formItem: {
      rules: [
        {
          required: true,
          message: '请输入类别编码',
        },
      ],
    },
  },
  {
    label: '排序',
    name: 'sort',
    formItem: {
      type: 'number',
    },
  },

  {
    label: '备注',
    name: 'remark',
    formItem: {
      type: 'textArea',
      span: 24,
      rules: [
        {
          max: 500,
          message: '不能大于500个字符',
        },
      ],
    },
  },
]
