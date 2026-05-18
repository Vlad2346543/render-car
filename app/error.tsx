'use client';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import css from './error.module.css';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  const router = useRouter();
  return (
    <div className="container">
      <div className={css.error}>
        <button
          className={css.goBack}
          onClick={() => {
            router.back();
          }}
        >
          <IoChevronBackCircleOutline size={24}  className={css.icon}/>
        </button>
        <p className={css.text}>{error.message}</p>
      </div>
    </div>
  );
}