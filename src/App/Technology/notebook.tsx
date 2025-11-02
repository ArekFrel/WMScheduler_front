            {ops.map((op: Operation) => (
              
            ))}

'
            <td className={opStyle(record.OP_1)}>
              {/* {record.OP_1} */}
              <SelectField id={record.ID} op={record.OP_1} />
            </td>
            <td className={opStyle(record.OP_2)}>
              {/* {record.OP_2} */}
              <SelectField id={record.ID} op={record.OP_2} />
            </td>
            <td className={opStyle(record.OP_3)}>
              {/* {record.OP_3} */}
              <SelectField id={record.ID} op={record.OP_3} />
            </td>
            <td className={opStyle(record.OP_4)}>
              {/* {record.OP_4} */}
              <SelectField id={record.ID} op={record.OP_4} />
            </td>
            <td className={opStyle(record.OP_5)}>
              {/* {record.OP_5} */}
              <SelectField id={record.ID} op={record.OP_5} />
            </td>
            <td className={opStyle(record.OP_6)}>
              {/* {record.OP_6} */}
              <SelectField id={record.ID} op={record.OP_6} />
            </td>
            <td className={opStyle(record.OP_7)}>
              {/* {record.OP_7} */}
              <SelectField id={record.ID} op={record.OP_7} />
            </td>
            <td className={opStyle(record.OP_8)}>
              {/* {record.OP_8} */}
              <SelectField id={record.ID} op={record.OP_8}/>
            </td>
            <td className={opStyle(record.OP_9)}>
              {/* {record.OP_9} */}
              <SelectField id={record.ID} op={record.OP_9} />
            </td>''



      setChangedRecords((prev) => {
        const existing = prev.find((record) => record.ID = arg.ID);
        if (existing) {
          return prev.map((record) =>
          record.ID === arg.ID ? {...record, [operation]: newValue} : record);
        } else {
          return [...prev, { ID: arg.ID, [operation]: newValue }];
        }
      })   