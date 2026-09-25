import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import type { CreateOrderResponseData, FiltersType, isCreatingOrderType, NavElementType, Sneakers } from '../types'
import axios, { AxiosError } from 'axios'
import { formatNumber } from '../utils/formatNumber';
import Favorites from '../components/Favorites.vue'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import { Paths } from '../router'
import { toast } from 'vue3-toastify';
import { useWindowSize } from '@vueuse/core';
import { MOBILE_WIDTH, URL } from '../constants';
export const useState = defineStore('sneakers', () => {
    const sneakers = ref<Sneakers[]>([])
    const likedSneakers = ref<Sneakers[]>([])
    const cart = ref<Sneakers[]>([])
    const cartPrice = ref<number>(0)
    const error = ref<AxiosError | null>(null)
    const isLoading = ref<boolean>(false)
    const isDrawer = ref<boolean>(false)
    const drawerPath = ref('')
    const { width: displayWidth, height: displayHeight } = useWindowSize()
    const isCreatingOrder = reactive<isCreatingOrderType>({
        isLoading: false,
        isSucces: false,
        isError: false,
    })
    const filtersDefaultValue: FiltersType = {
        sortBy: 'name',
        searchQuery: '',
    }
    const filters = reactive<FiltersType>(filtersDefaultValue)

    const initialization = () => {
        const cartInLocalStorage: Sneakers[] = JSON.parse(localStorage.getItem('cart') || '[]')
        cart.value = cartInLocalStorage
    }

    const resetFilters = () => {
        filters.searchQuery = filtersDefaultValue.searchQuery
        filters.sortBy = filtersDefaultValue.sortBy
    }

    const fetchSneakersData = async () => {
        try {
            const params = {
                sortBy: filters.sortBy,
                title: `*${filters.searchQuery}*`,
            }
            const { data } = await axios.get<Sneakers[]>(URL + `/items`, { params })
            sneakers.value = data
        } catch (er) {
            const e = er as AxiosError
            error.value = e
        } finally {
            isLoading.value = false
        }
    }

    const fetchFavorites = async () => {
        try {
            const params = {
                sortBy: filters.sortBy,
                title: `*${filters.searchQuery}*`,
            }
            const { data } = await axios.get<Sneakers[]>(URL + `/favorites`, { params })
            likedSneakers.value = data
        } catch (er) {
            const e = er as AxiosError
            error.value = e
        } finally {
            isLoading.value = false
        }
    }

    const setLike = async (sneaker: Sneakers) => {
        try {
            if (!sneaker.isLiked) {
                sneaker.isLiked = true
                await axios.post(URL + `/favorites/${sneaker.id}`,)
            }
            else if (sneaker.isLiked) {
                sneaker.isLiked = false
                await axios.delete(URL + `/favorites/${sneaker.id}`)
            }
        } catch (er) {
            sneaker.isLiked = !sneaker.isLiked
            const e = er as AxiosError
            error.value = e
        } finally {
            await fetchFavorites()
        }
    }

    const createOrder = async () => {
        try {
            isCreatingOrder.isLoading = true
            await axios.post<CreateOrderResponseData>(URL + '/orders', {
                items: cart.value,
                totalPrice: cartPrice.value,
            });
            cart.value = []
            isCreatingOrder.isSucces = true
            cartPrice.value = 0
            await fetchSneakersData()
        } catch (er) {
            isCreatingOrder.isLoading = false
            isCreatingOrder.isError = true
            const e = er as AxiosError;
            error.value = e;
            throw e;
        }
        finally {
            isCreatingOrder.isLoading = false
        }
    }

    const addCart = (sneaker: Sneakers) => {
        const id = Math.floor(Math.random() * 9999)
        if (cart.value.filter((sn) => sn.id !== id)) {
            cart.value.push({
                ...sneaker,
                id
            })
        }
        else {
            addCart(sneaker)
        }
    }

    const delCart = (sneaker: Sneakers) => {
        sneaker.isAddedToCart = false
        cart.value = cart.value.filter((sn) => sn.id !== sneaker.id)
        if (sneakers.value) sneakers.value = sneakers.value?.map((sn) => {
            if (sn.id === sneaker.id) {
                return {
                    ...sn,
                    isAddedToCart: false,
                }
            }
            else {
                return sn
            }
        })
    }

    const navElements = ref<NavElementType[]>([
        {
            path: Paths.home,
            name: 'Главная',
            src: "/home.png",
            component: Home,
            styles: '',
        },
        {
            path: Paths.favorites,
            name: 'Закладки',
            src: "/heart.svg",
            component: Favorites,
            styles: '',
        },
        {
            path: `${drawerPath.value}`,
            src: "/cart.svg",
            name: `${formatNumber(cartPrice.value)} руб`,
            styles: 'nav-cart '
        },
        {
            path: Paths.profile,
            src: "/profile.svg",
            name: 'Профиль',
            component: Profile,
            styles: '',
        },
    ])
    watch(isDrawer, () => {
        if (!isDrawer.value && (isCreatingOrder.isSucces || isCreatingOrder.isError)) {
            isCreatingOrder.isSucces = isDrawer.value
            isCreatingOrder.isError = isDrawer.value
        }
    })
    watch(error, () => {
        toast.error(error.value)
    }, { deep: true })
    watch(filters, fetchSneakersData)
    watch(cart, () => {
        localStorage.setItem('cart', JSON.stringify(cart.value))
        const price = (cart.value ?? []).reduce((sum, item) => {
            return sum + (item?.price ?? 0)
        }, 0)
        cartPrice.value = price
        navElements.value.map((el) => {
            if (el.styles.includes('nav-cart')) {
                el.name = `${formatNumber(price)} руб`
            }
        })
    }, { deep: true })

    watch(displayWidth, () => {
        navElements.value.map((el) => {
            if (el.styles.includes('nav-cart')) {
                if (displayWidth.value < MOBILE_WIDTH) {
                    el.path = Paths.drawer
                }
                else {
                    el.path = ''
                }
            }
        })
    }, { immediate: true })

    return {
        fetchSneakersData,
        setLike,
        createOrder,
        addCart,
        filters,
        sneakers,
        cart,
        cartPrice,
        error,
        isLoading,
        isCreatingOrder,
        isDrawer,
        delCart,
        navElements,
        resetFilters,
        displayWidth,
        displayHeight,
        fetchFavorites,
        likedSneakers,
        initialization
    }
})