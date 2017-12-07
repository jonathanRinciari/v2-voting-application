/* global $ */

var vote;
$('input:checkbox').click(function() {
        $('input:checkbox').not(this).prop('checked', false);
        vote = $(this).attr('id')
        console.log(vote)
    });
    
$('button').click(function(){
  
})