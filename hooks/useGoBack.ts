import { useRouter } from 'next/navigation';

const useGoBack = () => {
    const router = useRouter();

    const goBack = () => {
        if (window.history.length > 1) {
            router.back();
        }
        else {
            // Redirect to home page if no history exists
            router.push('/'); 
        }
    }

    return goBack;
}

export default useGoBack;