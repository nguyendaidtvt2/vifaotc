// $(function () {
//     $('.popover').popover({
//         container: 'body'
//     })
// });

$(document).ready(function () {

    $('#trans-sell-btn').click(
        function () {
            $('#trans-img').attr('src', 'images/client-sell.png').show(1000);
        }
    );

    $('#trans-buy-btn').click(
        function () {
            $('#trans-img').attr('src', 'images/client-buy.png').show(1000);
        }
    );

});


