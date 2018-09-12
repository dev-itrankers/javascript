var options = {
    rootMargin :"0px",
    threshold  : "0.4"
}
var observer = new IntersectionObserver(function(intersection){
    for(var elem of intersection){
        if(elem.isIntersecting && !elem.target.isLoaded){
            elem.target.isLoaded = true;
        }
    }
},options);
class myImg extends HTMLElement{
    constructor(){
        super();
        this._shadow = this.attachShadow({mode:"closed"});
        var imgTag = document.createElement("div");
        var style = document.createElement("style");
        style.innerHTML = `
        :host{
            display:block;
        }
        img{
            width:100%;
            height:100%;
            animation-name:show;
            animation-duration:2s;
            position:relative;
            z-index:0;
        }
        @keyframes show{
            from{
                opacity: 0;
            }
        }
        `;
        this._shadow.appendChild(style);
        // this._shadow.appendChild(imgTag);
        this.minify = "/c_scale,h_16,q_16,w_16";
    }
    get isLoaded(){
        return this._loaded;
    }
    set isLoaded(loaded){
        if(this._loaded) return;
        var link = "http://res.cloudinary.com/danish/image/upload";
        var img = new Image();
        var shadow = this._shadow;
        img.onload = function(){
            shadow.appendChild(img);
        }
        img.src = link+this.getAttribute("src");
        this._loaded = loaded
    }
    connectedCallback(){
        var src = this.getAttribute("src");
        var link = "http://res.cloudinary.com/danish/image/upload"
        if(!src) throw new Error("Image attribute is required");
        this.style.backgroundImage = `url(${link}${this.minify}${src})`;
        this.style.backgroundRepeat = "no-repeat";
        this.style.backgroundSize = "100%"
        this.style.backgroundColor = "#fff"
        
        observer.observe(this);
    }
    disconnectedCallback(){
        observer.disconnect(this);
    }
};

customElements.define("my-img",myImg);


var link = "http://res.cloudinary.com/danish/image/upload";
document.querySelector("my-img").addEventListener("mousemove",function(e){
    var styles = document.querySelector(".style").sheet.cssRules;
    for(var style in styles){
        if(styles[style].selectorText && styles[style].selectorText==".banner-img:first-child::after"){
            styles[style].style.backgroundImage = `url(${link}${this.getAttribute("src")})`;
            styles[style].style.backgroundSize ="200vw 100vh";
            var st= getComputedStyle(this);
            var matrix = new WebKitCSSMatrix(st.webkitTransform);
            styles[style].style.backgroundPosition = (matrix.m41-e.clientX+50)+"px"+" "+(-1*(e.clientY-100))+"px";
            styles[style].style.backgroundRepeat = "no-repeat"
            styles[style].style.top = (e.offsetY-100)+"px";
            // styles[style].style.top = (500)+"px";
            styles[style].style.transform = "scale(1.2)"
            styles[style].style.left = (e.offsetX-100)+"px";
            // styles[style].style.left = (500)+"px";

        }
    }
});