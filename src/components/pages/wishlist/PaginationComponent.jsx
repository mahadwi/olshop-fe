import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import './pagination.scoped.scss'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PaginationComponent({ metaPagination, setMetaPagination }) {
    const [pages, setPages] = useState([])

    useEffect(() => {
        loadListPages()
    }, [metaPagination])

    const loadListPages = () => {
        const tempPages = []

        for (let i = 1; i <= metaPagination.totalPage; i++) {
            tempPages.push(i)
        }

        setPages(tempPages)
    }

    return (
        <div className='pagination-wrapper'>
            <div className='pagination'>
                {
                    metaPagination.currentPage - 1 > 0 ?
                        <Link to={`/account/wishlist?page=${metaPagination.currentPage - 1}`} className='prev'><IconChevronLeft style={{ color: '#444' }} size={18} /></Link>
                        : <></>
                }
                <ul>
                    {
                        metaPagination.currentPage > 1 ?
                            <li>
                                <Link to={`/account/wishlist?page=1`}>{1}</Link>
                            </li>
                            : <></>
                    }

                    {
                        metaPagination.currentPage > 2 ?
                            <li>
                                <Link to={`/account/wishlist?page=2`}>{2}</Link>
                            </li>
                            : <></>
                    }

                    <li className='active'>{metaPagination.currentPage}</li>
                    {
                        pages.filter((p) => p > metaPagination.currentPage && p < metaPagination.currentPage + 4).map((page) => (
                            <li className={`${page == metaPagination.currentPage ? 'active' : ''}`}>
                                {
                                    page == metaPagination.currentPage ?
                                        page : <Link to={`/account/wishlist?page=${page}`}>{page}</Link>
                                }
                            </li>
                        ))
                    }

                    {
                        pages[pages.length - 2] >= metaPagination.currentPage + 4 ?
                            <li>
                                <Link to={`/account/wishlist?page=${pages[pages.length - 2]}`}>{pages[pages.length - 2]}</Link>
                            </li>
                            : <></>
                    }
                    {
                        pages[pages.length - 1] >= metaPagination.currentPage + 4 ?
                            <li>
                                <Link to={`/account/wishlist?page=${pages[pages.length - 1]}`}>{pages[pages.length - 1]}</Link>
                            </li>
                            : <></>
                    }
                </ul>
                {
                    metaPagination.currentPage + 1 <= pages[pages.length - 1] ?
                        <Link to={`/account/wishlist?page=${metaPagination.currentPage + 1}`} className='next'><IconChevronRight style={{ color: '#444' }} size={18} /></Link>
                        : <></>
                }
            </div>
        </div>
    )
}
