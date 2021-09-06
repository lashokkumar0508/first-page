let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let s1 = "images/idle.png";

let loadImage =(src,callback) =>{
    let img = document.createElement("img");
    img.onload =() => callback(img);
    img.src = src;
};
loadImage(s1,(img)=> { ctx.drawImage(img,0,0,500,500);})

let imagePath =(frameNumber,animation) =>{
    
    return "images/"+animation+"/"+ frameNumber+".png";
};

let frames = {
    idle:[1, 2, 3, 4, 5, 6, 7, 8],
    kick:[1, 2, 3, 4, 5, 6, 7],
    punch:[1, 2, 3, 4, 5, 6, 7],
    forward:[1, 2, 3, 4, 5, 6],
    backward:[1, 2, 3, 4, 5, 6],
    block:[1, 2, 3, 4, 5, 6,7,8,9]
};

let loadImages =(callback) =>{
    
    let images1 = {idle:[], kick:[], punch:[],forward:[], backward:[],block:[]};
    let imagestoLoad = 0;
    ["idle","kick","punch","forward","backward","block"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagestoLoad = imagestoLoad + animationFrames.length;
        animationFrames.forEach((frameNumber)=> {
            let path = imagePath(frameNumber,animation);

            loadImage(path,(image) => {
                images1[animation][frameNumber - 1] = image;
                imagestoLoad = imagestoLoad - 1;
    
                if(imagestoLoad === 0){
                        callback(images1);
                    }
                })
        })
        
        });
};

let animate = (ctx,images1,animation, callback) =>{
    images1[animation].forEach((image,index) => {
        setTimeout(() =>{
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        },index*100);
    });
    setTimeout(callback,images1[animation].length * 100);
}

loadImages((images1) => {
    let selectedAnimation = "idle";
    let aux=() => {
        animate(ctx,images1,selectedAnimation,aux);
    };

    //aux();

    document.getElementById("kick").onclick = () =>{
        selectedAnimation = "kick";
    };
    document.getElementById("punch").onclick = () =>{
        selectedAnimation = "punch";
    };

    document.addEventListener('keyup', (event) => {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        if(key === "ArrowLeft") selectedAnimation = "kick";
        if(key === "ArrowRight") selectedAnimation = "punch";
        if(key === "ArrowUp") selectedAnimation = "forward";
        if(key === "ArrowDown") selectedAnimation = "backward";
        if(key === "Shift") selectedAnimation = "block";
        if(key === "Enter") aux();
    });
});

