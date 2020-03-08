import PersonalIndex from "./index.vue"
import PersonalInfo from "./views/info.vue"

export default [
  {
    path: `/personal`,
    component: PersonalIndex,
    redirect: { name: "personal-info" },
    meta: {
      layout: `LayoutA`
    },
    children: [
      {
        path: "info",
        name: "personal-info",
        component: PersonalInfo
      }
    ]
  }
]
