/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2024-03-18 11:27:50
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-20 21:40:20
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
    label: '持仓数',
    name: 'number',
    formItem: {
      rules: [
        {
          required: true,
          message: '请输入持仓数',
        },
      ],
    },
  },
  {
    label: '持仓成本',
    name: 'cost',
    formItem: {
      rules: [
        {
          required: true,
          message: '请输入持仓成本',
        },
      ],
    },
  },
]
