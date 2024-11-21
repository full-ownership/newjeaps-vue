<template>
  <div class="flex flex-col bg-pink-200 h-[80%] ">
    <!--연혁 시작-->
    <div class="bg-pink-100 w-[100vw] h-full flex flex-row">
      <!-- 왼쪽 섹션 -->
      <div class = "bg-white w-1/2 relative">

        <div data-aos="fade-right" data-aos-duration="1400" class="image-wrapper p-auto bg-pink-200 absolute
        top-[190px] left-[25%] transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400">
          <img src="@/assets/img/intro/main1.jpg" alt="logo_kor" width="320" />
        </div>

        <div class="
          absolute flex flex-row w-full ml-auto top-[400px] left-1/6 transform -translate-x-1/2 -translate-y-1/2
          flex flex-row justify-end"
          data-aos="fade-right" data-aos-duration="1400" >

          <div class="text-center text-gray-800 text-xl ml-4 text-bold font-Pretendard ">
            인재영입 (박주현 수석사원)
          </div>
          <div class=" text-center text-gray-800 text-2xl ml-4 text-bold font-Pretendard">
            12
          </div>
          <div class="text-center text-gray-800 text-2xl ml-4 font-PretendardSemiBold">
            2024
          </div>
          <div class="text-center text-gray-800 text-2xl  font-PretendardSemiBold">
            .11
          </div>
          <div class="bg-blue-400 w-[120px] h-[2px] my-auto "></div>
        </div>

        <div data-aos="fade-right" data-aos-duration="1400" class="image-wrapper p-auto absolute
          top-[480px] left-[25%] transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400">
          <img src="@/assets/img/intro/main3.png" alt="logo_kor" width="320" />
        </div>

      </div>

      <!-- 가운데 선 -->
       <div class="relative">
        <div class="w-[12px] h-[60vh] mt-12 bg-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-8"></div>
        <!--히트토리 타이틀 점-->
        <span class="bg-blue-400 w-[120px] h-[120px]
        text-center
        absolute top-[120px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10
        flex">
          <span class="m-auto text-white text-2xl font-PretendardSemiBold">걸어온 길</span>
        </span>
        <!--점 -->
        <span class="bg-blue-100 w-[30px] h-[30px] absolute top-[320px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10"></span>
        <span class="bg-blue-400 w-[12px] h-[12px] absolute top-[320px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10"></span>


        <span class="bg-blue-100 w-[30px] h-[30px] absolute top-[455px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10"></span>
        <span class="bg-blue-400 w-[12px] h-[12px] absolute top-[455px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10"></span>

        <span class="bg-blue-100 w-[30px] h-[30px] absolute top-[615px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10"></span>
        <span class="bg-blue-400 w-[12px] h-[12px] absolute top-[615px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10"></span>
      </div>

      <!-- 오른쪽 섹션 -->
      <div class = "bg-white w-1/2 relative">
        <!-- 연혁 블록 오른쪽 블록-->
        <div class="
          absolute flex flex-row top-[260px] left-1/6 transform -translate-x-1/2 -translate-y-1/2"
          data-aos="fade-left" data-aos-duration="1400" >
          <div class="bg-blue-400 w-[120px] h-[2px] my-auto"></div>
          <div class="w-[200] text-center text-gray-800 text-2xl text-bold font-PretendardSemiBold ">
            2024
          </div>
          <div class="w-[200] ml-1 text-center text-gray-800 text-2xl text-bold font-PretendardSemiBold ">
            .07
          </div>
          <div class="w-[200] ml-4 text-center text-gray-800 text-2xl font-Pretendard">
            12
          </div>
          <div class="w-[200] ml-4 text-center text-gray-800 text-xl font-Pretendard">
            뉴집스 설립
          </div>
        </div>

        <div data-aos="fade-right" data-aos-duration="1400" class="image-wrapper p-auto absolute
          top-[350px] right-[25%] transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400">
          <img src="@/assets/img/intro/main2.jpeg" alt="logo_kor" width="320" />
        </div>

        <!-- 연혁 블록 오른쪽 블록-->
        <div class="
          absolute flex flex-row top-[600px] left-1/6 transform -translate-x-1/2 -translate-y-1/2"
          data-aos="fade-left" data-aos-duration="1400" >
          <div class="bg-blue-400 w-[120px] h-[2px] my-auto"></div>

          <div class="w-[200] text-center text-gray-800 text-2xl text-bold font-PretendardSemiBold ">
            2024
          </div>
          <div class="w-[200] ml-1 text-center text-gray-800 text-2xl text-bold font-PretendardSemiBold ">
            .07
          </div>
          <div class="w-[200] ml-4 text-center text-gray-800 text-2xl font-Pretendard">
            27
          </div>
          <div class="w-[200] ml-4 text-center text-gray-800 text-xl font-Pretendard">
            SSAFY 관통 최우수상 수상
          </div>
        </div>
      </div>
    </div>
    <!--연혁 끝-->
  </div>

</template>

