import React from 'react';
import Lottie from 'lottie-react';

import LoadingAnimation from 'src/utils/loading.json';

const Loading = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Lottie animationData={ LoadingAnimation } loop autoPlay style={{ height: '20%' }}/>
        </div>
);

export default Loading;

// https://app.lottiefiles.com/animation/9d32e71b-0125-42be-a41c-84e41cd51360?channel=web&source=public-animation&panel=download