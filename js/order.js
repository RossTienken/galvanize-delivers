$(".button-collapse").sideNav();
let items = [];
let $subtotal = $('#subtotal');
let $total = $('#total');
let $tax = $('#tax');
let $tbody = $('tbody')

//event listeners
$('#placeOrder').on('click', checkValid);

//functions
function renderOrder() {
  let subtotal = 0;
  $tbody.empty();
  for (let item of items) {
    let $tr = $('<tr>');
    let $tdName = $('<td>');
    let $tdPrice = $('<td>');
    $tdName.text(item.name);
    $tdPrice.text(`$${item.price.toFixed(2)}`);
    $tdPrice.addClass('right-align');
    $tr.append($tdName);
    $tr.append($tdPrice);
    $tbody.append($tr);
    subtotal += item.price;
    }
  let tax = subtotal * 0.1;
  let total = subtotal + tax;
  $subtotal.text(`$${subtotal.toFixed(2)}`)
  $tax.text(`$${tax.toFixed(2)}`)
  $total.text(`$${total.toFixed(2)}`)
}
renderOrder();
$('.addItem').on('click', (event) => {
    event.preventDefault();

    let item = {};
    let $target = $(event.target);
    let $cardContent = $target.parent().siblings('.card-content');

    item.name = $cardContent.children('.card-title').text();
    item.price = parseFloat($cardContent.children('p').text().slice(1));

    items.push(item);

    renderOrder();
  });

function adjustTotals(price) {
  //calculates subtotal
  let workingSubtotal = subtotal.text().replace('$', '');
  workingSubtotal = Number(workingSubtotal);
  workingSubtotal += price;
  subtotal.text("$" + workingSubtotal.toFixed(2));
  //calculates tax
  let workingTax = Number((workingSubtotal*.1));
  tax.text('$' + workingTax.toFixed(2));
  //add those two to find total
  total.text('$' + (workingTax + workingSubtotal).toFixed(2));
}
//checking for valid inouts
function checkValid(event) {
  if ($('tbody').children().length === 0) {
    Materialize.toast('Add something to your order first!', 4000);
    return;
  }
  if ($('#name').val().length === 0) {
    Materialize.toast('Please include your name', 4000);
    return;
  }
  if ($('#phoneNumber').val().match(/[0-9]{10}/) === null) {
    Materialize.toast('Please enter a valid phone number', 4000);
    return;
  }
  if ($('#address').val().length === 0) {
    Materialize.toast('Please enter a valid address', 4000);
    return;
  }
  Materialize.toast('Your order has been placed!', 4000);
}
