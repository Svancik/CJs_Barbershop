export const servicesCategories = [
  {
    id: 1,
    icon: "vlasyStrih",
    header: "Vlasy",  
  },

  {
    id: 2,
    icon: "vousyUprava",
    header: "Úprava vousů",
   
  },

  {
    id: 3,
    icon: "vlasyStrihaVousyUprava",
    header: "Kombinace + káva",
    title: "Kombinace"
  },

  {
    id: 4,
    icon: "fajnsmekr",
    header: "Extravagant"
  },

  {
    id: 5,
    icon: "vlasyStrihVousyHotTowel",
    header: "Přídavky",
    isAdditional: true
  },
]


export const services = [
  //VLASY
    {
      id: 1,
      categoryId: 1, 
      nazev: "Vlasy jednou velikostí",
      cena: 270,     
      delkaTrvani: 15 
    },
    {
      id: 2,
      categoryId: 1, 
      nazev: "Klasický střih",
      cena: 440,    
      delkaTrvani: 30  
    },
    {
      id: 3,
      categoryId: 1, 
      nazev: "Buzzcut (vršek strojkem, strany skin fade)",
      cena: 490,     
      delkaTrvani: 30 
    },
    {
      id: 4,
      categoryId: 1, 
      nazev: "Premium střih (skin fade)",
      cena: 520,     
      delkaTrvani: 45 
    },
    {
      id: 5,
      categoryId: 1, 
      nazev: "Vlasy dlouhé",
      cena: 590,      
      delkaTrvani: 60
    },
    {
      id: 39,
      categoryId: 1, 
      nazev: "Holení vlasů do hladka",
      cena: 490,      
      delkaTrvani: 30
    },



    //ÚPRAVA VOUSŮ
    {
      id: 6,
      categoryId: 2, 
      nazev: "Vousy krátké",
      cena: 350, 
      delkaTrvani: 30     
    },
    {
      id: 7,
      categoryId: 2, 
      nazev: "Vousy dlouhé",
      cena: 390,  
      delkaTrvani: 30   
    },
    {
      id: 8,
      categoryId: 2, 
      nazev: "Holení dohladka",
      cena: 390,  
      delkaTrvani: 40   
    },



    //KOMBINACE

    {
      id: 10,
      categoryId: 3, 
      nazev: "Střih strojkem (1 velikost) + vousy krátké ",
      cena: 570, 
      delkaTrvani: 45     
    },
    {
      id: 11,
      categoryId: 3, 
      nazev: "Střih strojkem (1 velikost) + vousy dlouhé ",
      cena: 610,     
      delkaTrvani: 45
    },
    {
      id: 22,
      categoryId: 3, 
      nazev: "Střih strojkem (1 velikost) + holení vousů do hladka ",
      cena: 610, 
      delkaTrvani: 55     
    },
    {
      id: 12,
      categoryId: 3, 
      nazev: "Klasický střih + vousy krátké ",
      delkaTrvani: 60,
      cena: 740,     
    },
    {
      id: 13,
      categoryId: 3, 
      nazev: "Klasický střih + vousy dlouhé ",
      delkaTrvani: 60,
      cena: 780,     
    },
    {
      id: 23,
      categoryId: 3, 
      nazev: "Klasický střih + holení vousů do hladka ",
      delkaTrvani: 70,
      cena: 780,     
    },
    {
      id: 14,
      categoryId: 3, 
      nazev: "Premium střih (skin fade) + vousy krátké ",
      delkaTrvani: 75,
      cena: 820,     
    },
    {
      id: 15,
      categoryId: 3, 
      nazev: "Premium střih (skin fade) + vousy dlouhé ",
      cena: 860,  
      delkaTrvani: 75,   
    },
    {
      id: 26,
      categoryId: 3, 
      nazev: "Premium střih (skin fade) + holení vousů do hladka ",
      cena: 830, 
      delkaTrvani: 85    
    },
    {
      id: 16,
      categoryId: 3, 
      nazev: "Buzzcut + vousy krátké ",
      cena: 790,     
      delkaTrvani: 60,
    },
    {
      id: 17,
      categoryId: 3, 
      nazev: "Buzzcut + vousy dlouhé ",
      cena: 830,    
      delkaTrvani: 60, 
    },
    {
      id: 25,
      categoryId: 3, 
      nazev: "Buzzcut + holení vousů do hladka ",
      cena: 830,     
      delkaTrvani: 70,
    },
    {
      id: 18,
      categoryId: 3, 
      nazev: "Vlasy dlouhé + vousy krátké ",
      cena: 890, 
      delkaTrvani: 90    
    },
    {
      id: 19,
      categoryId: 3, 
      nazev: "Vlasy dlouhé + vousy dlouhé ",
      cena: 930, 
      delkaTrvani: 90    
    },
    {
      id: 27,
      categoryId: 3, 
      nazev: "Vlasy dlouhé + holení vousů do hladka",
      cena: 930,      
      delkaTrvani: 100
    },

    {
      id: 30,
      categoryId: 3, 
      nazev: "Holení vlasů do hladka + vousy krátké ",
      cena: 790,  
      delkaTrvani: 60    
    },

    {
      id: 31,
      categoryId: 3, 
      nazev: "Holení vlasů do hladka + vousy dlouhé ",
      cena: 830,  
      delkaTrvani: 70    
    },




    {
      id: 24,
      categoryId: 3, 
      nazev: "Holení vlasů do hladka + holení vousů do hladka ",
      cena: 830,  
      delkaTrvani: 75   
    },

    





    //EXTRAVAGANT
    {
      id: 40,
      categoryId: 4,
      nazev: "Vlasy, vousy/holení do hladka, péče o pleť, styling, balzám na vousy, zvýraznění kontur,depilace nítí a voskem, Mytí, ošetrení, masáž hlavy-vlasove tonikum, parfem, alkohol, nápoj z ledničky a káva",
      cena: 1790,
      delkaTrvani: 90
    },



    //PŘÍDAVKY
    {
      id: 41,
      categoryId: 5, 
      nazev: "Péče o pleť",
      cena: 900,     
      delkaTrvani: 45,
    },
    {
      id: 42,
      categoryId: 5, 
      nazev: "Barvení vousů - menší",
      cena: 230,   
      delkaTrvani: 15,  
    },
    {
      id: 142,
      categoryId: 5, 
      nazev: "Barvení vousů - větší",
      cena: 290,   
      delkaTrvani: 15,  
    },
    {
      id: 43,
      categoryId: 5, 
      nazev: "Hair Tattoo - menší",
      cena: 59,    
      delkaTrvani: 10, 
    },
    {
      id: 143,
      categoryId: 5, 
      nazev: "Hair Tattoo - větší",
      cena: 170,    
      delkaTrvani: 20, 
    },
    {
      id: 44,
      categoryId: 5, 
      nazev: "Černá maska",
      cena: 100, 
      delkaTrvani: 10,    
    },
    {
      id: 45,
      categoryId: 5, 
      nazev: "Depilace voskem",
      cena: 69,     
      delkaTrvani: 5,
    },
    {
      id: 46,
      categoryId: 5, 
      nazev: "Depilace nití",
      cena: 100,    
      delkaTrvani: 5, 
    },
    {
      id: 47,
      categoryId: 5, 
      nazev: "Mytí hlavy",
      cena: 59,     
      delkaTrvani: 5,
    },
    {
      id: 48,
      categoryId: 5, 
      nazev: "Zvýraznění kontur",
      cena: 39,     
      delkaTrvani: 5,
    },
    {
      id: 49,
      categoryId: 5, 
      nazev: "Masáž hlavy vlasové tanikum",
      cena: 69,     
      delkaTrvani: 5,
    },

    {
      id: 91,
      categoryId: 5, 
      nazev: "Styling",
      cena: 59,   
      delkaTrvani: 5,  
    },













    {
      id: 5,
      icon: "vousyUprava",
      time: "30",
      header: "Úpra",
      cena: "300",
      text: "Úprava vousů strojkem, ošetření vousů balzámem či olejem na vousy, úprava obočí a kontur, opálení uší, kolínská dle výběru. Nápoje samozřejmostí (Coca Cola, voda, káva, čaj)."
    },
    {
      id: 5,
      icon: "vlasyStrihaVousyUprava",
      time: "60",
      header: "Střih vlasů + vousy strojkem",
      cena: "700",
      text: "Střih vlasů, úprava obočí a kontur, mytí vlasů, opálení uší, styling a kolínská dle výběru. Nápoje samozřejmostí (Coca Cola, voda, káva, čaj)."
    },
    {
      id: 6,
      icon: "vlasyStrihVousyHotTowel",
      time: "75",
      header: "Střih vlasů + úprava vousů (Hot towel)",
      cena: "900",
      text: "Střih vlasů a úprava vousů břitvou (Hot towel + napaření steamerem (holení s párou), zastřižení tvaru vousů strojkem před holením, úprava obočí a kontur, mytí vlasů, opálení uší, balzám před holením, ošetření balzámem po holení, závěrečná úprava vousů, balzám či olej na vousy, styling a kolínská dle výběru. Nápoje samozřejmostí (Coca Cola, voda, káva, čaj)."
    },
    {
      id: 5,
      icon: "fajnsmekr",
      time: "90",
      header: "Masírek",
      cena: "1490",
      text: "Úprava vousů břitvou (Hot towel + napaření steamerem (holení s párou), peeling obličeje, ošetření balzámem po holení, závěrečná úprava vousů, balzám či olej na vousy, styling, kolínská či parfémová voda dle výběru, parafínový zábal rukou, depilace chloupků v nose, masáž hlavy. "
    },
    

]

export const visibleGalleryItems = [
    {
      id: 1,
      src: "videoStrih5.MP4",
      video: true,
      extraCSS: "mediumItem" 
  },
  {
      id: 2,
      src: "videoStrih1.MP4",
      extraCSS: "bigItem",
      video: true,
  },
  {
      id: 3,
      src: "strih6.webp",
  },
  {
    id: 4,
    src: "strih1.webp",
},
{
  id: 7,
  src: "videoStrih3.MP4",
  video: true,
},
  {
      id: 5,
      src: "strih8.webp",
  },


]

export const hiddenGalleryItems = [
  {
    id: 7,
    src: "strih2.webp",
},
  {
   id: 10,
   src: "strih17.webp" 
  },
  {
   id: 12,
   src: "strih5.webp" 
  },
  {
    id: 16,
    src: "videoStrih2.MP4",
    video: true,
    extraCSS: "mediumItem" 
   },
  {
   id: 13,
   src: "strih9.webp" 
  },

  {
   id: 14,
   src: "strih10.webp" 
  },
  {
   id: 15,
   src: "strih13.webp" 
  },
  {
    id: 8,
    src: "videoStrih4.MP4",
    video: true,
   },

  {
   id: 16,
   src: "strih14.webp" 
  },
  {
   id: 17,
   src: "strih15.webp" 
  },
  {
   id: 18,
   src: "strih16.webp" 
  },
]

