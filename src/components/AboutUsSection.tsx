// src/components/AboutUsSection.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutUsSection: React.FC = () => {
    return (
        <section id="tentang" className="py-16 bg-gray-50">
            <div className="container mx-auto flex flex-wrap items-center px-4">
                <div className="w-full md:w-1/2 p-4">
                    {/* Ganti src dengan path gambar Anda di folder /public */}
                    <Image src="/about-us-placeholder.jpg" alt="Tentang Kami" width={600} height={400} className="rounded-lg shadow-lg" />
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Tentang Kami</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        HIMPENAS adalah organisasi mahasiswa yang berfokus pada pengembangan skill di dunia teknologi, khususnya dalam ekosistem Linux dan Open Source. Kami berkomitmen untuk menciptakan lingkungan belajar yang kolaboratif dan inovatif bagi seluruh anggota.
                    </p>
                    <Link href="/tentang" className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                        Pelajari Lebih Lanjut
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default AboutUsSection;