from django.http import HttpResponse
from django.shortcuts import render, redirect
from riceshare.seller.forms import SellerForm
from riceshare.seller.models import Seller


def register(request):
    if request.method == "POST":
        seller_form = SellerForm(request.POST or None, request.FILES or None)
        if seller_form.is_valid():
            seller = Seller(seller=request.user, description=seller_form.cleaned_data['description'],
                            evaluation=seller_form.cleaned_data['evaluation'])
            seller.save()
            return HttpResponse("Register Successfully")
        else:
            return HttpResponse("Register has an error")
    else:
        seller_form = SellerForm()
        return render(request, "seller/register.html", context={"seller_form": seller_form})
