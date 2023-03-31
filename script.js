
let canvas = document.getElementById('MyCanvas');
let ctx = canvas.getContext('2d');
let w = canvas.width;
let h = canvas.height;
let range =50;
let bl = 1;
let rangex = w/range;
let rangey = h/range;
let color = "green";
ctx.translate(w/2, h/2);
ctx.scale(range,range);

function checkTheZero()
{
    let a = document.getElementById('numberA').value;
    let b = document.getElementById('numberB').value;
    let c = document.getElementById('numberC').value;
    let url ="http://localhost:8080/math/quadraticFunction?Variable1="+a+"&Variable2="+b+"&Variable3="+c;
    		$.ajax({
    			type: "GET",
                dataType: 'json',
    			url: url,
    			success: function(data){

    			console.log(data);
   			    displayData(data);
                    	},
                error: function(data){
                $('.result').empty();
                $('.result').removeClass('displayNone');
                $('.result').append("Wypełnij wszystkie pola!");
                }
});
}
function clearCanvas()
{
    ctx.clearRect(-range,-range, w, h);
    $('.result').addClass('displayNone');
    drawGrid();
}
function drawGrid()
{   ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
	for(i=-range;i<=range;i+=0.5)
	{
		ctx.lineWidth = 1/80;
		ctx.beginPath();
		ctx.moveTo(i,-range);
		ctx.lineTo(i,range);
		ctx.closePath();
		ctx.stroke();
	}
	for(i=-range;i<=range;i+=0.5)
	{
		ctx.lineWidth = 1/80;
		ctx.beginPath();
		ctx.moveTo(-range,i);
		ctx.lineTo(range,i);
		ctx.closePath();
		ctx.stroke();
	}
	ctx.lineWidth = 1/15;
	ctx.beginPath();
	ctx.moveTo(-range,0);
	ctx.lineTo(range,0);
	ctx.closePath();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0,-range);
	ctx.lineTo(0,range);
	ctx.closePath();
	ctx.stroke();
	for(i=-range;i<=range;i+=1)
	{
	    if(i!=0){
	        ctx.font = "0.5px Arial";
		    ctx.fillText(i,(i+0.07),-0.10);
		    ctx.lineWidth = 1/20;
            ctx.beginPath();
        	ctx.moveTo(i,-0.12);
        	ctx.lineTo(i,0.12);
        	ctx.closePath();
        	ctx.stroke();
        }
    }
    for(i=range;i>=-range;i--)
	{

	        ctx.font = "0.5px Arial";
		    ctx.fillText(-i,0.1,(i-0.1));
            if(i!=0){
		    		ctx.lineWidth = 1/20;
                    ctx.beginPath();
                    ctx.moveTo(-0.12,i);
                    ctx.lineTo(0.12,i);
                    ctx.closePath();
                    ctx.stroke();
            }
    }
    ctx.save();

}

drawGrid();

function displayData(data)
 {
    $('.result').empty();
    $('.title').empty();
    $('.result').removeClass('displayNone');
    $('.result').append("&#916; = "+data.delta+"<br> "+data.odp);
    $('.title').append('y='+data.number_a+'x<sup>2</sup>+'+data.number_b+'x+'+data.number_c);

    let a = data.number_a;
    let b = data.number_b;
    let c = data.number_c;
    let d = data.delta;
    let p = data.p;
    let q = data.q;
    let x1 = data.x1;
    let x2 = data.x2;
    let wzor = "y="+data.number_a+"x<sup>2</sup>+"+data.number_b+"x+"+data.number_c;

        ctx.beginPath();
            for(x=-rangex;x<=rangex;x+=0.1){
            let y = (a*(x*x))+(b*x)+c;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2/range;

                if(y!='')
                {
                    if (isNaN(y) || (y == Number.NEGATIVE_INFINITY) ||
                    (y == Number.POSITIVE_INFINITY) || (Math.abs(y) > 5e2)) {
                    bl = 2;
                    y = 0.0;
                    }
                    if (bl > 0)
                    {
                        if (bl == 1)
                        {
                            ctx.moveTo(x, -y);
                        }
                        --bl;
                    }
                    else {
                        ctx.lineTo(x, -y);
                    }
                }
            }
            ctx.stroke();

            //rysowanie czerownych kropek
            ctx.beginPath();
            ctx.rect(p-(2.5/range), -q-(2.5/range), (5/range), 5/range);

            ctx.rect(0-(2.5/range), -c-(2.5/range), (5/range), 5/range);
            if(d>0){
                 ctx.rect(x1-(2.5/range), 0-(2.5/range), (5/range), 5/range);
                 ctx.rect(x2-(2.5/range), 0-(2.5/range), (5/range), 5/range);
            }
            ctx.fillStyle = "red";
            ctx.fill();

}


