import type { Component } from "vue"

export type Sneakers = {
    id: number,
    title: string,
    price: number,
    imageUrl: string,
    isLiked: boolean,
    isAddedToCart: boolean,
}

export type CreateOrderResponseData = {
    items: Sneakers[],
    totalPrice: number,
}

export type isCreatingOrderType = {
    isLoading: boolean,
    isSucces: boolean,
    isError: boolean,
}

export type FiltersType = {
    sortBy: 'name' | 'price' | '-price',
    searchQuery: string,
}

export type NavElementType = {
    path: string,
    name: string,
    src: string,
    component?: Component,
    styles: string,
}