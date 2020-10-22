return (
    <body className="bg-white">
    <nav
        className="h-24 lg:h-24 flex items-center justify-between flex-wrap bg-white p-6"
    >
        <div className="flex items-center flex-shrink-0 text-white mr-6 titleFont">
                <span
                    className="font-semibold text-3xl tracking-tight text-black ml-10"
                >GoParty!</span>
        </div>
        <button
        [routerLink]="'/login'" class="mdc-button" style="color: black; outline: none"><span
    class="mdc-button__ripple"></span> Login
  </button>
  <div
    class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
  ></div>
</nav>
<div class="hideScrollbar" id="content" style="height: 100%;overflow-y: scroll;position: fixed;">
  <!-- Hero Section -->
  <div class="grid grid-rows-3 lg:grid-cols-2 lg:grid-rows-none bg-no-repeat"
       style="background-image: url(./assets/images/wave-background.svg); display: flex; flex-direction: row">
    <!-- Left Section -->
    <div class="w-full flex flex-col justify-center items-center text-center">
      <div class="h-40 w-full lg:w-3/4 flex flex-col mt-16">
        <p class="text-4xl leading-tight font-heading font-bold">
          Aliquam egestas dapibus sem pellentesque non sapien
          neque.
        </p>
        <span
          class="text-xl leading-tight m-4 font-body font-normal"
        >Curabitur fringilla porttitor erat, eget ullamcorper
                        nibh consectetur et. Quisque egestas sem nec
                        sapien.</span
        >
      </div>
      <div
        class="w-full lg:w-3/4 flex justify-center items-center mt-40"
      >
        <a href="#">
          <img
            class="h-12 p-2 lg:p-1"
            src="./assets/images/apple-store.svg"
          />
        </a>
        <a href="#">
          <img
            class="h-12 p-2 lg:p-1"
            src="./assets/images/google-play-badge.svg"
          />
        </a>
      </div>
    </div>
    <!-- Right Section -->
    <div>
      <img class="" src="./assets/images/iphone_x_3d.png"/>
    </div>
  </div>
  <!-- Features Section -->
  <p class="text-center text-2xl font-heading font-bold m-8 underline">
    Lorem ipsum dolor sit amet
  </p>
  <!-- First Feature -->
  <div class="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none" style="display: flex; flex-direction: row">
    <!-- Left Section -->
    <div class="w-full flex justify-center">
      <img class="py-20" src="./assets/images/iphone_x_screen.png"/>
    </div>
    <!-- Right Section -->
    <div class="w-full flex flex-col items-center ">
      <div class="h-40 w-3/4 flex flex-col mt-16">
        <p class="text-xl leading-tight font-heading font-bold">
          Vivamus commodo lacus
        </p>
        <span
          class="text-base leading-tight mt-4 font-body font-normal"
        >Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Morbi cursus sem eu cursus tempor. Duis accumsan
                        nisl lorem, at interdum ex ultrices sit amet.
                        Suspendisse tristique vehicula tortor sit amet ultrices.
                        Nunc lobortis felis sit amet enim iaculis, quis
                        pellentesque sapien varius. Aliquam vel nunc non nisi
                        feugiat accumsan vel in metus. Curabitur placerat
                        molestie libero, congue interdum lectus pretium quis.
                        Aliquam lacinia placerat hendrerit. Morbi bibendum
                        accumsan orci.
                    </span>
      </div>
    </div>
  </div>
  <!-- Second Feature -->
  <div
    class="grid grid-rows-2 grid-cols-none lg:grid-cols-2 lg:grid-rows-none"
    style="display: flex; flex-direction: row"
  >
    <!-- Left Section -->
    <div class="w-full flex flex-col items-center ">
      <div class="h-40 w-3/4 flex flex-col mt-16">
        <p class="text-xl leading-tight font-heading font-bold">
          Aliquam auctor egestas dui ac egestas
        </p>
        <span
          class="text-base leading-tight mt-4 font-body font-normal"
        >Nunc gravida ipsum eu diam egestas placerat. Aliquam
                        erat volutpat. Quisque egestas sem nec sapien blandit
                        pellentesque in in magna. Duis convallis lorem eget
                        velit interdum sodales. Ut rhoncus arcu leo, ut porta
                        sem scelerisque in. Ut condimentum elit vitae mauris
                        congue bibendum. Aenean mattis eleifend lectus, ut
                        semper leo consectetur sit amet. Nulla facilisi. Etiam
                        pretium lorem eget lacus dignissim, at pretium augue
                        varius. Morbi id vulputate dui, sed venenatis purus.
                        Vestibulum ante ipsum primis in faucibus orci luctus et
                        ultrices posuere cubilia Curae; Etiam lacinia nec felis
                        ut accumsan.
                    </span>
      </div>
    </div>
    <!-- Right Section -->
    <div class="w-full flex justify-center">
      <img class="py-20" src="./assets/images/iphone_x_screen.png"/>
    </div>
  </div>
  <div class="w-full bg-gray-100 text-center pb-12 px-6">
            <span class="font-body text-sm text-gray-500"
            >© Untitled. All rights reserved. Icons: Font Awesome</span
            >
  </div>
</div>
</body>

)
