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
   			    displayData(data)
                    	},
                error: function(data){
                $('.result').empty();
                $('.result').append("Wypełnij wszystkie pola!");
                }


});
}
function displayData(data)
 {
    $('.result').empty();
    $('.title').empty();

     $('.result').append("&#916; = "+data.delta+"<br> "+data.odp);
     $('.title').append('y='+data.number_a+'x<sup>2</sup>+'+data.number_b+'x+'+data.number_c);
 }