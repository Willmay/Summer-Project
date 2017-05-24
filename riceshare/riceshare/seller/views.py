from django.http import HttpResponse
from django.contrib import messages
from django.shortcuts import render, redirect
from .forms import SellerForm, UserForm
from .models import Seller, User


def register(request):
    if request.method == "POST":
        user_form = UserForm(request.POST or None, request.FILES or None)
        seller_form = SellerForm(request.POST or None, request.FILES or None)

        if seller_form.is_valid() and user_form.is_valid():
            seller = Seller(
                seller=request.user,
                introduction=seller_form.cleaned_data['introduction'],
                goal=seller_form.cleaned_data['goal'],
                chef_type=seller_form.cleaned_data['chef_type'],
                chef_experience=seller_form.cleaned_data['chef_experience'],
                cuisine_type=seller_form.cleaned_data['cuisine_type'],
            )
            seller.save()

            for key, value in user_form.cleaned_data.items():
                setattr(request.user, key, value)
            if user_form.cleaned_data['photo']:
                request.user.photo = user_form.cleaned_data['photo']
            request.user.save()

            messages.success(request, 'Register successfully! You have already become seller.')
            return redirect('post:post_home')
        else:
            messages.success(request, 'Register failed!')
            return redirect('post:post_home')
    else:
        user_form = UserForm()
        seller_form = SellerForm()
        return render(request, "seller/register.html", context={"user_form": user_form, "seller_form": seller_form})
