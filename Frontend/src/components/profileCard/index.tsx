const ProfileCard = () => {
    return (
        <div className="w-full mx-2 space-y-5 shadow-md card">
            <figure className="p-10 bg-black">
                <img src="./public/wm.svg" alt="Shoes" className="w-12" />
            </figure>
            <div className="items-center text-center card-body">
                <h2 className="card-title">Fajrin Nurhakim</h2>
            </div>
        </div>
    );
};

export default ProfileCard;
