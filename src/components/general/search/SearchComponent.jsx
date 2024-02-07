import './search.scoped.scss'
import { useTranslation } from 'react-i18next';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Api from '../../../utils/Api';
import { Link } from 'react-router-dom';

export default function SearchComponent({ setSearchOpen, brands, categories }) {
    /**
     * Hooks
     *
     */
    const { t } = useTranslation();

    /**
     * State
     *
     */
    const [param, setParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [debounce, setDebounce] = useState(0);

    useEffect(() => {
        setLoading(true);
        if (param) {
            Api.get(`/product`, {
                params: {
                    search: param
                }
            }).then((res) => {
                setProducts(res.data.data);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [param])

    return (
        <div className='search-component' onClick={(event) => { if (event.currentTarget == event.target) { setSearchOpen(false); }; }}>
            <div className='search-background'>
                <div className='searchbar'>
                    <form 
                        className='inner'
                        onSubmit={(event) => {
                            console.log(event);
                            event.preventDefault()
                        }
                    }>
                        <IconSearch size={22} color='#C4C4C4' />
                        <input type='text' placeholder={t('searchplaceholder')} onInput={(event) => {
                            clearTimeout(debounce);
                            const val = event.currentTarget.value;
                            if (val) {
                                setDebounce(setTimeout(() => {
                                    setParam(val);
                                }, 1000))
                            } else {
                                setParam('');
                            }
                        }} />
                    </form>
                    <button onClick={() => { setSearchOpen(false) }}>
                        <IconX />
                    </button>
                </div>
                { param && !loading && products.length != 0 ?
                <div className='products-result'>
                    <div className='title'>{t('searchresultfor')} "{param}"</div>
                    <div className='products'>
                        {
                            products.map((p) => {
                                return (<div><a href={`/shop/${p.id}`}>{p.name}</a></div>)
                            })
                        }
                    </div>
                </div>
                : null }
                { param && !loading && products.length == 0 ?
                <div className='products-not-found text-center'>
                    {t('searchresultnotfound')} "{param}"
                </div>
                : null }
                { !param && loading ?
                <div className='brand-categories'>
                    <div>
                        <div className='title'>
                            Brand
                        </div>
                        <div className='detail'>
                            {categories.map((data, index) => (
                                <div key={index}>
                                    <a href={`/collective/${data.id}`}>{data.name}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className='title'>
                            {t('categories')}
                        </div>
                        <div className='detail'>
                            {brands.map((data, index) => (
                                <div key={index}>
                                    <a href={`/designers/${data.id}`}>{data.name}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                : null }
            </div>
        </div>
    )
}
