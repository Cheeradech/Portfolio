import React from "react";

const AnimatedMail = () => {
    return (
        <div className="flex items-center justify-start md:justify-start w-full h-[180px] md:h-[220px] overflow-visible mb-6 scale-[0.5] md:scale-[0.6] origin-left" style={{ willChange: 'transform' }}>
            <style>{`
        /* 1. อนิเมชั่นเขียนข้อความบนจดหมาย */
        @keyframes writeText {
          0%, 15% { width: 0%; opacity: 0; }
          20% { width: 80%; opacity: 1; }
          25% { width: 80%; opacity: 1; }
          30% { width: 90%; opacity: 1; }
          35%, 75% { width: 90%; opacity: 1; }
          80%, 100% { width: 0%; opacity: 0; }
        }

        /* 2. อนิเมชั่นดึงจดหมายลงก่อนปิดซอง */
        @keyframes slideDownLetter {
          0%, 45% { transform: translateY(0); }
          50%, 75% { transform: translateY(30px); }
          80%, 100% { transform: translateY(0); }
        }

        /* 3. อนิเมชั่นพับฝาซองจดหมายปิด */
        @keyframes foldFlap {
          0%, 50% { transform: rotateX(180deg); z-index: 10; }
          55%, 75% { transform: rotateX(0deg); z-index: 40; }
          80%, 100% { transform: rotateX(180deg); z-index: 10; }
        }

        /* 4. อนิเมชั่นจรวด/เครื่องบินกระดาษบินรอบๆ */
        @keyframes flyAround {
          0% { transform: translate(-150px, -50px) rotate(20deg) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          30% { transform: translate(180px, -120px) rotate(45deg) scale(0.6); z-index: 0; }
          50% { transform: translate(250px, 80px) rotate(140deg) scale(0.9); z-index: 50; }
          70% { transform: translate(-100px, 150px) rotate(220deg) scale(1); z-index: 50; opacity: 1; }
          90% { transform: translate(-200px, 0px) rotate(300deg) scale(0.8); opacity: 0; z-index: 50; }
          100% { transform: translate(-150px, -50px) rotate(20deg) scale(0.8); opacity: 0; }
        }

        /* วนลูป 2.8s ตามที่ต้องการให้เร็วขึ้นจาก 8s (0.8s อาจเร็วเกินไปจนมองไม่ทัน) */
        .animate-write-1 { animation: writeText 2.8s infinite linear; animation-delay: 0s; will-change: width, opacity; }
        .animate-write-2 { animation: writeText 2.8s infinite linear; animation-delay: 0.15s; will-change: width, opacity; }
        .animate-write-3 { animation: writeText 2.8s infinite linear; animation-delay: 0.3s; will-change: width, opacity; }
        .animate-write-4 { animation: writeText 2.8s infinite linear; animation-delay: 0.45s; will-change: width, opacity; }
        
        .animate-letter { animation: slideDownLetter 2.8s infinite ease-in-out; will-change: transform; }
        .animate-flap { 
          transform-origin: top; 
          animation: foldFlap 2.8s infinite ease-in-out; 
          transform-style: preserve-3d;
          will-change: transform;
        }
        .animate-rocket { animation: flyAround 2.8s infinite ease-in-out; will-change: transform, opacity; }

        /* การตัดรูปทรง (Clip-paths) สำหรับฝาซองแต่ละด้าน */
        .clip-flap-top { clip-path: polygon(0 0, 100% 0, 50% 100%); }
        .clip-flap-left { clip-path: polygon(0 0, 100% 50%, 0 100%); }
        .clip-flap-right { clip-path: polygon(100% 0, 100% 100%, 0 50%); }
        .clip-flap-bottom { clip-path: polygon(0 100%, 50% 45%, 100% 100%); }
      `}</style>

            {/* Container หลัก */}
            <div className="relative w-[500px] h-[400px] flex items-center justify-center">

                {/* Background Blobs (ปรับ blur ธรรมดาแทน backdrop-blur ลดการกินทรัพยากร) */}
                <div className="absolute w-[450px] h-[350px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] z-0 border border-white/5" style={{ background: 'radial-gradient(circle, rgba(235,228,252,0.08) 0%, rgba(235,228,252,0) 70%)' }}></div>

                {/* จรวด/เครื่องบินกระดาษ */}
                <div className="absolute z-50 animate-rocket pointer-events-none">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 2L2.99998 9.53001C2.51525 9.73426 2.44391 10.4287 2.89481 10.7292L8.5 14.5L16 6.5L10.5 16.5L17.2917 21.3654C17.6534 21.6245 18.1755 21.4397 18.2838 21.0116L21.8488 2.94632C21.9482 2.44234 21.4746 1.99933 21 2Z" fill="#B3C4DE" />
                        <path d="M-10 18 L2 14" stroke="#B3C4DE" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
                    </svg>
                </div>

                {/* ซองจดหมาย Group */}
                <div className="relative w-[320px] h-[220px] mt-10">

                    {/* พื้นหลังซองด้านหลังสุด */}
                    <div className="absolute inset-0 bg-[#3C22B8] rounded-b-md z-10"></div>

                    {/* ฝาซองด้านบน (พับได้) */}
                    <div className="absolute top-0 left-0 w-full h-[140px] bg-[#5338D6] clip-flap-top animate-flap origin-top z-10 rounded-t-sm"></div>

                    {/* กระดาษจดหมาย */}
                    <div className="absolute bottom-[20px] left-[5%] w-[90%] h-[180px] bg-[#EEF2F9] rounded-t-md z-20 flex flex-col p-6 space-y-3 animate-letter border border-gray-100 shadow-sm">
                        <div className="h-3 bg-[#CBD6E9] rounded-full animate-write-1" style={{ width: '0%' }}></div>
                        <div className="h-3 bg-[#CBD6E9] rounded-full animate-write-2" style={{ width: '0%' }}></div>
                        <div className="h-3 bg-[#CBD6E9] rounded-full animate-write-3" style={{ width: '0%' }}></div>
                        <div className="h-3 bg-[#CBD6E9] rounded-full animate-write-4" style={{ width: '0%' }}></div>
                    </div>

                    {/* ด้านหน้าซองจดหมาย */}
                    <div className="absolute inset-0 z-30">
                        {/* ซ้าย */}
                        <div className="absolute inset-0 bg-[#5B3EED] clip-flap-left rounded-bl-md"></div>
                        {/* ขวา */}
                        <div className="absolute inset-0 bg-[#5338D6] clip-flap-right rounded-br-md"></div>
                        {/* ล่าง */}
                        <div className="absolute inset-0 bg-[#4F33D1] clip-flap-bottom rounded-b-md"></div>
                    </div>

                    {/* ไอคอน @ และ Contact Card */}
                    <div className="absolute inset-0 z-50 pointer-events-none">
                        <div className="absolute top-10 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                            <span className="text-[#5B3EED] text-xl font-bold">@</span>
                        </div>

                        <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md flex items-center space-x-2 w-[110px]">
                            <div className="w-8 h-8 rounded-full bg-[#E2E8F0] flex items-center justify-center">
                                <div className="flex flex-col items-center mt-1">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                    <div className="w-5 h-2.5 bg-white rounded-t-full mt-[1px]"></div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1 w-full">
                                <div className="h-1.5 bg-[#5B3EED] rounded-full w-3/4"></div>
                                <div className="h-1 bg-[#CBD6E9] rounded-full w-full"></div>
                                <div className="h-1 bg-[#CBD6E9] rounded-full w-5/6"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnimatedMail;
