import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function getFriendlyDate(date) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("en-US", options);
}

export function percIncrease(a, b) {
  let percent;
  if (b !== 0) {
    if (a !== 0) {
      percent = ((b - a) / a) * 100;
    } else {
      percent = b * 100;
    }
  } else {
    percent = -a * 100;
  }
  return Math.floor(percent);
}

export function getDaysPast(date) {
  const oldDate = new Date(date);
  const timeDiffernce = new Date().getTime() - oldDate.getTime();
  const daysPast = timeDiffernce / (1000 * 3600 * 24);
  return daysPast.toFixed(0);
}

export function getIconType(daysGoneBy) {
  if (daysGoneBy > 14) {
    return <i className='fa fa-circle text-c-red f-10 m-r-15' />;
  }
  if (daysGoneBy > 7 && daysGoneBy < 15) {
    return <i className='fa fa-circle text-c-yellow f-10 m-r-15' />;
  }
  return <i className='fa fa-circle text-c-green f-10 m-r-15' />;
}

export function actionsFormatter(cell, row) {
  if (row.deadline) {
    return (
      <>
        <span className='table-remove'>
        <Link to={`/projects/${row.id}`}>
          <Button variant="primary"className="no-p">
            <i className='far fa-eye'></i>
          </Button>
        </Link>
        <Link to={`/projects/${row.id}/edit`}>
          <Button variant="success"className="no-p">
            <i className='fas fa-edit'></i>
          </Button>
        </Link>
        <Link to={`/projects/${row.id}/edit`}>
          <Button variant="danger" className="no-p">
            <i className='far fa-trash-alt'></i>
          </Button>
        </Link>
        </span>
      </>
    );
  }

  return (
    <>
      <span className='table-remove'>
        <Link to={`/tickets/${row.id}`}>
          <Button variant="primary" className="no-p">
            <i className='far fa-eye'></i>
          </Button>
        </Link>
        <Link to={`/tickets/${row.id}/edit`}>
          <Button variant="success" className="no-p">
            <i className='fas fa-edit'></i>
          </Button>
        </Link>
        <Link to={`/tickets/${row.id}/edit`}>
          <Button variant="danger" className="no-p">
            <i className='far fa-trash-alt'></i>
          </Button>
        </Link>
      </span>
    </>
  );
}

export function statusFormatter(cell, row) {
  if (cell === "OPEN") {
    return <span className="badge badge-primary">{cell}</span>;
  }
  if (cell === "DEVELOPMENT") {
    return <span className="badge badge-secondary">{cell}</span>;
  }
  if (cell === "TESTING") {
    return <span className="badge badge-success">{cell}</span>;
  }
  if (cell === "RESOLVED") {
    return <span className="badge badge-danger">{cell}</span>;
  }
  if (cell === "CLOSED") {
    return <span className="badge badge-warning">{cell}</span>;
  }
  if (cell === "ARCHIVED") {
    return <span className="badge badge-info">{cell}</span>;
  }
  return <span className="badge badge-dark">{cell}</span>;
}

export function priorityFormatter(cell, row) {
  if (cell === "URGENT") {
    return <span className="badge badge-warning">{cell}</span>;
  }
  if (cell === "MEDIUM") {
    return <span className="badge badge-primary">{cell}</span>;
  }
  if (cell === "HIGH") {
    return <span className="badge badge-success">{cell}</span>;
  }
  return <span className="badge badge-secondary">{cell}</span>;
}

export function dateFormatter(cell, row) {
  if (row.created_at) {
    return getFriendlyDate(cell);
  }
}
export function avatarFormatter(cell, row) {
  if (row.created_at) {

   return (<div className="pro-head"><a href="#"><img src={cell} style={{ width:35 , marginRight:8 }}class="img-radius" alt="Avatar"/><span>{row.first_name} {row.last_name}</span></a></div>)
  }
}
