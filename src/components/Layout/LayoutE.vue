<template>
  <div>
    <input
      id="show-menu"
      type="checkbox"
    >

    <div id="fix-bar">
      <div class="logo">
        <a href="/">logo</a>
      </div>

      <div class="push">
        <label
          class="hamburguer"
          for="show-menu"
        >
          <span />
          <span />
          <span />
          <span />
        </label>
      </div>
    </div>

    <div id="canvas">
      <div id="nav">
        <ul class="site-menu">
          <li>
            <a href="#/work">Work</a>
          </li>
          <li class="has-sub">
            <a href="#/about">About</a>
          </li>
          <li>
            <a href="#/careers">Careers</a>
          </li>
          <li>
            <a href="#/ideas">Ideas</a>
          </li>
          <li>
            <a href="#/news">News</a>
          </li>
          <li>
            <a href="#/events">Events</a>
          </li>
          <li>
            <a href="#/contact">Contact</a>
          </li>
          <li class="copy">
            © 2016 Logo. All Rights Reserved.
          </li>
        </ul>
      </div>

      <label
        for="show-menu"
        class="mask"
      />

      <div id="content">
        <h1>Lorem ipsum dolor sit amet</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ut rerum voluptatum, expedita, ab perspiciatis nulla omnis veritatis, dignissimos explicabo officia neque eos. Itaque, reiciendis corrupti quos. Ipsa, non, itaque!</p>
        <p>Illum minima praesentium reiciendis iure voluptatem, maxime accusamus temporibus, quisquam nihil nostrum placeat, repudiandae facere. Nihil odio quia omnis iure temporibus. Ullam itaque consequatur eveniet voluptatem nam, suscipit nesciunt iste!</p>
        <p>Est eum delectus officia. Sequi hic reiciendis est ullam aliquid rem voluptates deserunt! Accusamus, consequuntur! Delectus distinctio doloremque possimus provident qui rerum id. Molestiae, impedit, porro nisi repellat atque esse.</p>
        <p>At possimus commodi dolorum hic dicta unde ipsam sequi laborum! Dignissimos tempora facere dolore ipsam eligendi repudiandae, ipsa placeat doloribus cumque quod dolores ab, ea labore incidunt ex sapiente! Possimus.</p>
        <p>Maxime beatae quia similique error quod cumque dicta facere, consequuntur quos? Alias ducimus aliquam commodi quis veritatis, beatae libero iure culpa id reiciendis ratione. Dolorum voluptatibus iusto id accusantium adipisci.</p>
        <p>Accusantium molestias velit ut voluptate adipisci sit possimus id. Consequuntur debitis suscipit ducimus nemo officia dolor voluptates saepe doloribus corporis dolorem autem, quasi, tempore maxime sapiente deleniti rem, a. Nesciunt.</p>
        <p>Nemo animi vitae fuga repellendus sequi, laborum voluptates molestias quo reprehenderit tenetur libero non quis deserunt veritatis culpa tempora a, voluptatem itaque. Totam atque id, praesentium corporis eaque dignissimos sed.</p>
        <p>Pariatur omnis expedita voluptates, aut laborum consequatur repudiandae aperiam, delectus voluptate, saepe ea magnam distinctio dolorum a reiciendis suscipit. Corporis ex animi reiciendis vero natus porro, tenetur dignissimos blanditiis quis?</p>
        <p>Adipisci dicta vitae, totam quisquam, aliquam sint non qui hic est beatae architecto laboriosam in. Sed at, pariatur doloremque libero facere voluptates culpa dolore. Quo debitis similique culpa quis fuga?</p>
        <p>Non ipsum porro perferendis pariatur, harum iusto amet dolore quasi aut quidem quod laboriosam libero odit accusamus animi, cumque ea commodi corporis, sequi eaque numquam aliquam! Consequuntur, animi dolorum debitis?</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutE'
}
</script>

<style lang="scss" scoped>
#fix-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 60px;
  background-color: #00a8eb;
}
#fix-bar .logo {
  position: absolute;
  left: 0;
  width: 250px;
  transform: translate3d(-50%, 0, 0);
  transition: transform 0.5s ease;
}
#fix-bar .logo a {
  display: block;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 24px;
  width: 60px;
  height: 24px;
  padding: 18px 16px 18px 24px;
  box-sizing: content-box;
}
#fix-bar .push {
  position: relative;
  left: 0;
  height: 100%;
  background-color: #00a8eb;
  transition: transform 0.5s ease;
}
.hamburguer {
  width: 72px;
  height: 60px;
  display: block;
  position: relative;
  cursor: pointer;
}
.hamburguer span {
  display: block;
  position: absolute;
  height: 4px;
  width: 24px;
  background: #fff;
  opacity: 1;
  left: 24px;
  transform: rotate(0deg);
  transition: 0.3s ease-in-out;
}
.hamburguer span:nth-child(1) {
  top: 20px;
}
.hamburguer span:nth-child(2),
.hamburguer span:nth-child(3) {
  top: 28px;
}
.hamburguer span:nth-child(4) {
  top: 36px;
}
#canvas {
  position: relative;
  height: 100%;
  padding-top: 60px;
  overflow: hidden;
}
#nav {
  overflow-y: scroll;
  position: absolute;
  left: 0;
  height: 100%;
  width: 250px;
  transform: translate3d(-50%, 0, 0);
  transition: transform 0.5s ease;
  padding-top: 12px;
  padding-bottom: 60px;
}
#nav a {
  text-decoration: none;
  color: #000;
  display: block;
  padding: 14px 24px;
  font: 20px/1 'Montserrat', sans-serif;
  font-weight: 700;
}
#nav a:hover {
  background-color: #eee;
}
#nav .site-menu {
  position: relative;
  min-height: 100%;
  padding-bottom: 60px;
}
#nav .copy {
  position: absolute;
  bottom: 0;
  padding: 16px 24px;
  font-size: 12px;
  line-height: 1.4;
}
#content {
  background-color: #fff;
  overflow-y: scroll;
  position: relative;
  left: 0;
  height: 100%;

  transition: transform 0.5s ease;

  transform: translate3d(0, 0, 0);
  padding: 20px;
}
.mask {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease, z-index 0s 0.5s;
  background-color: rgba(0, 0, 0, 0.5);
}
input#show-menu {
  position: absolute;
  opacity: 0;
}
input#show-menu:checked ~ #fix-bar .push {
  transform: translate3d(250px, 0, 0);
}
input#show-menu:checked ~ #fix-bar .hamburguer span:nth-child(1),
input#show-menu:checked ~ #fix-bar .hamburguer span:nth-child(4) {
  top: 28px;
  width: 0;
  left: 50%;
}
input#show-menu:checked ~ #fix-bar .hamburguer span:nth-child(2) {
  transform: rotate(45deg);
}
input#show-menu:checked ~ #fix-bar .hamburguer span:nth-child(3) {
  transform: rotate(-45deg);
}
input#show-menu:checked ~ #canvas .mask {
  z-index: 1;
  opacity: 1;
  transform: translate3d(250px, 0, 0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
input#show-menu:checked ~ #canvas #nav,
input#show-menu:checked ~ #fix-bar .logo {
  transform: translate3d(0, 0, 0);
}
input#show-menu:checked ~ #canvas #content {
  transform: translate3d(250px, 0, 0);
}
</style>
