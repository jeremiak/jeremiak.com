---
title: California record retention schedule data dictionary
description: Trying to understand the data fields in a California STD 73 form? This one's for you. And me.
---

The California government requires state entities to submit record retention schedules on the STD 73 form. I stumbled across copies of the completed form long before I found the corresponding data dictionary, which made understanding the form _that_ much harder.

<style>
  details {
    margin-bottom: 1rem;
    padding: .4rem;
  }

  summary {
    cursor: pointer;
  }

  details p {
    margin-bottom: 1rem;
  }

  table {
    border-collapse: collapse;
  }

  th, td {
    padding: .2rem;
  }

  th {
    text-align: left;
    vertical-align: top;
  }

  td {
    vertical-align: top;
  }

  tbody tr:nth-child(odd) {
    background-color: #ebebeb;
  }

  table ul {
    list-style-type: none;
    padding-left: .4rem;
  }

  table ol {
    list-style-type: lower-alpha;
  }
</style>

<details>
  <summary>STD... 73... is a what now?</summary>
  <p>It's the form the California state government uses as a record retention schedule. Record retention schedules are the government's way of keeping track of which documents it has and which documents it can destroy.</p>
  <p>It's boring, but important. I'm glad the state does it.</p>
  <p>Here's what the specific form looks like:</p>
  <embed src="/img/std-73/std-73-and-data-dictionary.pdf" height="600" width="100%" type="application/pdf">
  <p>You can search through the record retention schedules on file with the Secretary of State on their <a href="https://gencat.sos.ca.gov/webcat/systems/cal/resource/export/html/browse-by/agency-index.html">Athena portal</a>.</p>
</details>

I finally found information about the form's fields on pages 22 and 23 of the [CalRIM Records Retention Handbook](https://archives.cdn.sos.ca.gov/calrim/handbook/2018-12-records-management-manual.pdf). And, frankly, that's a reasonable place to put it.

In any case I'm putting the field descriptions right here so that I can easily find them later.

And if you look through STD 73 forms, for fun or otherwise, and have helpful tips for understanding them I'd love to <a href="mailto:jbkimelman@gmail.com">hear from you</a>. To be honest, I could use all the help I can get.

<table>
  <thead>
    <tr>
      <th>Column number</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        1
      </d>
      <td>
        Department that the schedule belongs to.
      </td>
    <tr>
      <td>
        2
      </d>
      <td>
        Enter the appropriate billing code of the department.
      </td>
    <tr>
      <td>
        3
      </d>
      <td>
        Enter page numbers and total pages (e.g. 1 of 3, 2 of 3).
      </td>
    <tr>
      <td>
        4
      </d>
      <td>
        Division/branch/section within the department.
      </td>
    <tr>
      <td>
        5
      </d>
      <td>
        Address of the division/branch/section.
      </td>
    <tr>
      <td>
        6
      </d>
      <td>
        Check box if submitting a new schedule.
      </td>
    <tr>
      <td>
        7
      </d>
      <td>
        Check box if submitting a revision to previous schedule.
      </td>
    <tr>
      <td>
        8
      </d>
      <td>
        Check box if amending pages of a previous schedule.
      </td>
    <tr>
      <td>
        9
      </d>
      <td>
        Each department should establish it’s own system of numbering schedules. Enter the assigned number on each page.
      </td>
    <tr>
      <td>
        10
      </d>
      <td>
        Enter the date schedule prepared.
      </td>
    </tr>
    <tr>
      <td>11</td>
      <td>Enter total number of pages of the schedule.</td>
    </tr>
    <tr>
      <td>12</td>
      <td>Enter the total number of cubic feet for all items scheduled (round off to nearest cubic foot).</td>
    </tr>
    <tr>
      <td>13</td>
      <td>If applicable, enter the schedule number from the previous schedule.</td>
    </tr>
    <tr>
      <td>14</td>
      <td>If applicable, enter the approval number assigned to the previous schedule.</td>
    </tr>
    <tr>
      <td>15</td>
      <td>If applicable, enter the CalRIM approval date shown in block 28 of the previous schedule on STD 73 Rev. 6-02. Block 22 if referring to STD 72 Rev. 2-96 on the previous schedule.</td>
    </tr>
    <tr>
      <td>16</td>
      <td>If applicable, enter the total number of pages included on the previous schedule.</td>
    </tr>
    <tr>
      <td>17</td>
      <td>Enter the mission/functional statement for the entity responsible for the records described on the schedule.</td>
    </tr>
    <tr>
      <td>18</td>
      <td>Signature of manager responsible for the records.</td>
    </tr>
    <tr>
      <td>19</td>
      <td>Manager’s title.</td>
    </tr>
    <tr>
      <td>20</td>
      <td>Manager’s phone number.</td>
    </tr>
    <tr>
      <td>21</td>
      <td>Date schedule signed by the manager.</td>
    </tr>
    <tr>
      <td>22</td>
      <td>Signature of the department’s records management analyst (RMA).</td>
    </tr>
    <tr>
      <td>23</td>
      <td>Enter the official state classification of the department’s RMA, i.e., Records Management Analyst I, Business Services Officer I, etc.</td>
    </tr>
    <tr>
      <td>24</td>
      <td>Name of the RMA.</td>
    </tr>
    <tr>
      <td>25</td>
      <td>RMA’s phone number.</td>
    </tr>
    <tr>
      <td>26</td>
      <td>Date schedule is signed by the RMA.</td>
    </tr>
    <tr>
      <td>27</td>
      <td>Signature of CalRIM consultant.</td>
    </tr>
    <tr>
      <td>28</td>
      <td>Approval number assigned by CalRIM consultant.</td>
    </tr>
    <tr>
      <td>29</td>
      <td>Date schedule signed by CalRIM consultant.</td>
    </tr>
    <tr>
      <td>30</td>
      <td>This date is computed by adding five years to the date shown in Block 29.</td>
    </tr>
    <tr>
      <td>31</td>
      <td>This block is checked by the California State Archives if the schedule does not contain archive or long term reference records.</td>
    </tr>
    <tr>
      <td>32</td>
      <td>This block is checked by the California State Archives if the schedule contains material subject to archival review.</td>
    </tr>
    <tr>
      <td>33</td>
      <td>Signature of Chief of Archives or designated representative.</td>
    </tr>
    <tr>
      <td>34</td>
      <td>Date schedule is signed by Archives.</td>
    </tr>
    <tr>
      <td>35</td>
      <td>Enter the CalRIM Approval number shown in block 28.</td>
    </tr>
    <tr>
      <td>36</td>
      <td>Enter page numbers and total pages (e.g. 1 of 3, 2 of 3).</td>
    </tr>
    <tr>
      <td>37</td>
      <td>Item numbers must be sequentially assigned beginning with number 1 on the second page of the schedule.</td>
    </tr>
    <tr>
      <td>38</td>
      <td>Enter cubic feet of records (office and departmental) contained in each item (round off to nearest cubic foot). Leave blank when scheduling electronic/magnetic records.</td>
    </tr>
    <tr>
      <td>39</td>
      <td>This column is used by the Chief of Archives to designate records which may be of historical value. If the notation “Notify Archives” appears in this column, the Secretary of State’s Archive Unit must be notified before the records can be destroyed or transferred (SAM Section 1673.1).</td>
    </tr>
    <tr>
      <td>40</td>
      <td>Exact title of the records series must be entered in this column. The same title must also be used on the Records Transfer List, STD 71, if the records are later transferred to the State Records Center. Do not delete records for a discontinued program until all such records (including any stored at the Records Center) have been destroyed or ownership transferred to another entity. Acronyms must be spelled out in full the first time they are shown on the schedule.</td>
    </tr>
    <tr>
      <td>41</td>
      <td>Enter the appropriate storage media code for the series of records described;
        <ul>
          <li>P – paper (except for computer printouts)</li>
          <li>C – computer printouts</li>
          <li>M – magnetic or electronic (computer hard drives, computer tapes or disks, or word processing discs)</li>
          <li>D – diazo microfilm or microfiche (working copies)</li>
          <li>S – Silver halide microfilm</li>
          <li>RM – Removable Media consisting of ZIP, JAZ , etc.</li>
          <li>CD – Compact Disk, etc.</li>
          <li>OD – Optical Disk</li>
          <li>RAID – redundant array of independent disks</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>42</td>
      <td>Enter an “X” if the series of records is considered vital (essential) to department operations. Vital records require special protection from loss through the use of vault storage, microfilm, CD, magnetic tape or similar storage media. Enter the method of protection used in Column 48 (Remarks).</td>
    </tr>
    <tr>
      <td>43</td>
      <td>Enter the length of time the records series will be retained in the office. For records such as active license files or active tax accounts, enter the word “Active” in this column. Then enter the length of time (if any) the records will be held in office space when they are no longer active. In these cases Column 48 must state the event which terminates the active life of the records. Intermediate terms (such as, “indefinite” or “continuous”) must be avoided unless specifically stipulated by law or government code.</td>
    </tr>
    <tr>
      <td>44</td>
      <td>Records removed from office space and retained in less expensive space (such as a basement or other storage area) are considered to be department stored.</td>
    </tr>
    <tr>
      <td>45</td>
      <td>Records should be stored in the State Records Center when they meet the eligibility test of Section 1681 of the State Administrative Manual. The number of years records will remain in the Records Center must be entered in this column.</td>
    </tr>
    <tr>
      <td>46</td>
      <td>Enter the total number of years from Columns 43, 44, and 45. Include the active periods, if any.</td>
    </tr>
    <tr>
      <td>47</td>
      <td>
        PRA (Exempt) and IPA
        <ol>
          <li>Enter an “X” if the record is exempt from disclosure under the provisions of the Public Records Act. (Records so identified must show the authority for such exemption in Column 48.)</li>
          <li>When the record is exempt from disclosure, but the data subject is allowed access under the provisions of the Information Practices Act, enter an “I”.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>48</td>
      <td>
        Enter information which will explain or clarify treatment of the records, such as: citations from the Public Records Act (Government Code Section 6250 et seq.), Information Practices Act (Civil Code Section 1798 et seq.) or other State or federal statutes, the State Administrative Manual (SAM), California Acquisition Manual (CAM), State or Federal audit guidelines, Attorney General’s instructions, or agency policy statements, etc. Other helpful information includes, but is not limited to:
        <ol>
          <li>Events that trigger purging, updating or transferring records, or that terminate active status.</li>
          <li>Cross references to previous retention schedules under which material is stored at a records center, such as “See superseded Schedule 58, Item 166, Approval 88-200.”</li>
          <li>Type of destruction required when the records have reached the end of their retention period (such as, confidential witnessed destruction).</li>
          <li>Authority that stipulates the retention period of a record series.</li>
          <li>Authority that exempts disclosure of information to the public.</li>
        </ol>
      </td>
    </tr>
  </tbody>
</table>
