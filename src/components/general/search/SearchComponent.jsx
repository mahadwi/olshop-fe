import './search.scoped.scss'
import { useTranslation } from 'react-i18next';
import { IconSearch, IconX } from '@tabler/icons-react';

export default function SearchComponent({ setSearchOpen, brands, categories }) {
    /**
     * Hooks
     *
     */
    const { t } = useTranslation();

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
                        <input type='text' placeholder={t('searchplaceholder')} />
                    </form>
                    <button onClick={() => { setSearchOpen(false) }}>
                        <IconX />
                    </button>
                </div>
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
            </div>
        </div>
    )
}
