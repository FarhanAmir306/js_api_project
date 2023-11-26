

function secondsToMinutes(seconds) {
  var minutes = Math.floor(seconds / 60);
  var Seconds = seconds % 60;
  return `${minutes } minutes  ${Seconds} secondes`;
};


function sortByView(){
  display_show(1000,true);

}

// const code = async ()=>{
//       const res= await fetch("https://openapi.programming-hero.com/api/videos/categories");
//       const data=await res.json();
//       console.log(data.data);
// }
// code();

const display_show = async (id,sortByView=false)=> {
    const mediaContainer = document.querySelector("#media_container");
    mediaContainer.innerHTML = '';
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const val = await  response.json();
    const logo_container=document.querySelector(".logo_container");
    if(val.data.length==0)
    {
     
      const logo_section=document.createElement("div");
      logo_section.className='logo_section hiden_section';
      logo_section.innerHTML=`
        <div class="logo">
            <img src="./img/Icon.png" alt="">
        </div>
        <div class="text">
            <h1>Oops!!! Sorry ,There is No content here</h1>
        </div>
      `
      logo_container.appendChild(logo_section);
    }
    else{
      logo_container.innerHTML= '';
    }
      if(sortByView)
      {
        val.data.sort((a,b) =>parseInt( b.others.views)-parseInt( a.others.views)); 
      }
      
      
    
  // console.log(result[0].others.views);
    //  console.log(val.data[0].others.views);
    // for(const a of result)
    // {
    //   console.log(a.others.views);
    // }
   
    
    for(const data of val.data)
        {
          console.log(data);
            for(const pro of data.authors)
                {   
                    const card_section= document.createElement('div'); 
                        card_section.className='box'
                        card_section.innerHTML=`
                                  <div class="card  m-4" style="width: 18rem;">
                                      <img src="${data.thumbnail}" class="card-img-top" alt="">
                                      <div class="card-body">
                                      <div class="profile_section mb-3 d-flex align-items-center gap-3">
                                       <img class="img-fluid" src="${pro.profile_picture}"id="profile_pic" alt="">
                        
                                       <div class="card-img-overlay">
                                       <p class="card-text text-white"><small>${secondsToMinutes(data.others.posted_date)}</small></p>
                                     </div>

                                       <h5 class="title">${data.title}</h5>
                                     </div>
                                     <div>
                                      <span class="profile_name">${pro.profile_name}${pro.verified ? ' <span class="text-primary"> <i class="fa-solid fa-circle-check"></i></span>' :''}</span>
                                    
                                       <p class="view">${data.others.views}</p>
                                     </div>
                                   
                                    
                                   </div>
                                  </div>
                                     `
                     mediaContainer.appendChild(card_section)   
                 }
                        

        };
    
};











