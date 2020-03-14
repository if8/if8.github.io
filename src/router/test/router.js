import ShowIcons from '@components/ShowIcons.vue'
import TestIndex from './index.vue'

export default function(product) {
  return [
    {
      path: `/${product}`,
      name: product,
      component: TestIndex,
      meta: {
        layout: 'LayoutEmpty',
      },
      children: [
        {
          path: 'info',
          name: `${product}-info`,
          component: ShowIcons,
        },
      ],
    },
  ]
}
