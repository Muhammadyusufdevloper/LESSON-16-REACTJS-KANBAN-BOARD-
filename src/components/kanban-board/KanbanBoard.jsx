import { useRef, useState } from "react"
import { DATA } from "../../api"
import { MdDeleteOutline } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
let options = ["ready", "working", "stuck", "done"]
const KanbanBoard = () => {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("item")) || DATA)
    const [status, setStatus] = useState(null)
    let readyFilter = filterByStatus("ready")
    let workingFilter = filterByStatus("working")
    let stuckFilter = filterByStatus("stuck")
    let doneFilter = filterByStatus("done")
    const title = useRef(null)
    const text = useRef(null)

    const handelSaveData = (e) => {
        e.preventDefault();
        let id = new Date().getTime();
        let itemValue = {
            id,
            title: title.current.value,
            desc: text.current.value,
            status,
            createdAt: new Date().toLocaleDateString(),
        };
        let newData = [...data, itemValue]
        setData(newData);
        localStorage.setItem("item", JSON.stringify(newData))
        setStatus(false);
        title.current.value = "";
        text.current.value = "";
    };
    const handelDelete = (id) => {
        if (!confirm("Do you allow this information to be deleted?")) return
        let filTer = data?.filter((el) => el.id !== id)
        console.log(filTer);
        localStorage.setItem("item", JSON.stringify(filTer))
        setData(filTer)
    }
    const handelSelectOption = (id, newStatus) => {
        let updatedData = data?.map((el) => (el.id === id ? { ...el, status: newStatus } : el))
        setData(updatedData);
        localStorage.setItem("item", JSON.stringify(updatedData));
    }

    function filterByStatus(status) {
        return data?.filter((el) => el.status === status).map((el) => (
            <div key={el.id} className="kanban__item">
                <div className="kanban__item__top-boxes">
                    <p>{el.title}</p>
                    <button onClick={() => handelDelete(el.id)}><MdDeleteOutline /></button>
                </div>
                <p className='kanban__commit'>
                    {el.desc}
                </p>
                <div className="kanban__status">
                    <select onChange={(e) => handelSelectOption(el.id, e.target.value)}>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <span>{el.createdAt.split("T")}</span>
                </div>
            </div >
        ))
    }
    return (
        <section>
            <div className='container'>
                <div className="kanban">
                    <h2 className='kanban__title'>Kanban Board</h2>
                    <div className="kanban__header">
                        <button className='kanban__btn'>Add</button>
                    </div>
                    <div className={`kanban__edit-wrapper ${status ? "kanban__edit-show" : ""}`}>
                        <form onSubmit={handelSaveData} className="kanban__edit-from">
                            <input ref={title} type="text" required placeholder="Name enter" />
                            <input ref={text} type="text" required placeholder="Description enter" />
                            <button type="submit">Save</button>
                        </form>
                    </div>
                    <div className="kanban__wrapper">
                        <div className="kanban__box ready">
                            <div className="kanban__heading">
                                <p>Ready to start / {readyFilter?.length}</p>
                            </div>
                            <div className="kanban__block">
                                {readyFilter?.length === 0 ? <MdReportGmailerrorred className="kanban__block__icon" /> : readyFilter}
                            </div>
                            <button onClick={() => setStatus("ready")} className='kanban__add_btn'>Add item</button>
                        </div>
                        <div className="kanban__box working">
                            <div className="kanban__heading">
                                <p>Working to start / {workingFilter?.length}</p>
                            </div>
                            <div className="kanban__block ">
                                {workingFilter?.length === 0 ? <MdReportGmailerrorred className="kanban__block__icon" /> : workingFilter}
                            </div>
                            <button onClick={() => setStatus("working")} className='kanban__add_btn'>Add item</button>
                        </div>
                        <div className="kanban__box stuck">
                            <div className="kanban__heading">
                                <p>Stuck to start / {stuckFilter?.length}</p>
                            </div>
                            <div className="kanban__block">
                                {stuckFilter?.length === 0 ? <MdReportGmailerrorred className="kanban__block__icon" /> : stuckFilter}
                            </div>
                            <button onClick={() => setStatus("stuck")} className='kanban__add_btn'>Add item</button>
                        </div>
                        <div className="kanban__box done">
                            <div className="kanban__heading">
                                <p>Done to start / {doneFilter?.length}</p>
                            </div>
                            <div className="kanban__block">
                                {doneFilter?.length === 0 ? <MdReportGmailerrorred className="kanban__block__icon" /> : doneFilter}
                            </div>
                            <button onClick={() => setStatus("done")} className='kanban__add_btn'>Add item</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KanbanBoard