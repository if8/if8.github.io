import PersonalIndex from "./index.vue"
import PersonalInfo from "./views/info.vue"
import PersonalImage from "./views/image.vue"

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
      },
      {
        path: "image",
        name: "personal-image",
        component: PersonalImage,
        meta: {
          layout: `LayoutD`
        },
      }
    ]
  }
]
