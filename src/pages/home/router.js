import HomeIndex from "./index.vue"
import HomeChart from "./views/chart.vue"

export default [
  {
    path: `/home`,
    component: HomeIndex,
    redirect: { name: "home-chart" },
    meta: {
      layout: `LayoutE`
    },
    children: [
      {
        path: "chart",
        name: "home-chart",
        component: HomeChart
      },
    ]
  }
]
