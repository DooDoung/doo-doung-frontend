function Pagination({
    goPrev,
    currentPage,
    totalPages,
    setCurrentPage,
    goNext
}:{
    goPrev: () => void;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    goNext: () => void;
}) {
    return (
        <div className="flex items-center gap-4 mt-6 mb-6">

            <button
                onClick={goPrev}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-neutral-white border shadow disabled:opacity-40"
            >
                Prev
            </button>

            {/* Page numbers */}
            <div className="px-3 py-1 rounded-md bg-neutral-white border">
                {currentPage} / {totalPages}
            </div>

            <button
                onClick={goNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md bg-neutral-white border shadow disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;